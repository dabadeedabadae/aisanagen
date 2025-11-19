import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
 import { UpdateNewsDto } from './dto/update-news.dto.js';
import { toSlug } from '../common/slug.js';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  private async uniqueSlug(base: string) {
    let slug = toSlug(base) || 'item';
    let i = 0;
    while (true) {
      const candidate = i === 0 ? slug : `${slug}-${i}`;
      const exists = await this.prisma.news.findUnique({ where: { slug: candidate } });
      if (!exists) return candidate;
      i++;
    }
  }

  private getLocalizedField(item: any, field: string, lang?: string) {
    if (!lang || lang === 'ru') return item[field] || item[`${field}Kk`] || item[`${field}En`] || item[field];
    if (lang === 'kk') return item[`${field}Kk`] || item[field] || item[`${field}En`] || item[field];
    if (lang === 'en') return item[`${field}En`] || item[field] || item[`${field}Kk`] || item[field];
    return item[field];
  }

  async list(params: { page?: number; limit?: number; includeDrafts?: boolean; lang?: string }) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(50, Math.max(1, params.limit || 9));
    const where = params.includeDrafts ? {} : { published: true };
    const [total, items] = await this.prisma.$transaction([
      this.prisma.news.count({ where }),
      this.prisma.news.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        select: { 
          id: true, 
          slug: true, 
          title: true, 
          titleKk: true,
          titleEn: true,
          imageUrl: true, 
          excerpt: true,
          excerptKk: true,
          excerptEn: true,
          publishedAt: true 
        }
      })
    ]);
    
    const lang = params.lang || 'ru';
    const localizedItems = items.map(item => ({
      id: item.id,
      slug: item.slug,
      title: this.getLocalizedField(item, 'title', lang),
      imageUrl: item.imageUrl,
      excerpt: this.getLocalizedField(item, 'excerpt', lang),
      publishedAt: item.publishedAt
    }));
    
    return { items: localizedItems, page, limit, total, pages: Math.ceil(total / limit) };
  }

  async bySlug(slug: string, includeDrafts = false, lang?: string) {
    const item = await this.prisma.news.findUnique({ where: { slug } });
    if (!item || (!includeDrafts && !item.published)) throw new NotFoundException('News not found');
    
    const currentLang = lang || 'ru';
    return {
      id: item.id,
      slug: item.slug,
      title: this.getLocalizedField(item, 'title', currentLang),
      imageUrl: item.imageUrl,
      excerpt: this.getLocalizedField(item, 'excerpt', currentLang),
      content: this.getLocalizedField(item, 'content', currentLang),
      published: item.published,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  }

  async create(dto: CreateNewsDto) {
    const slug = await this.uniqueSlug(dto.title);
    const publishedAt = dto.publishedAt ? new Date(dto.publishedAt) : new Date();
    return this.prisma.news.create({
      data: {
        slug,
        title: dto.title,
        titleKk: dto.titleKk ?? null,
        titleEn: dto.titleEn ?? null,
        imageUrl: dto.imageUrl ?? null,
        excerpt: dto.excerpt ?? null,
        excerptKk: dto.excerptKk ?? null,
        excerptEn: dto.excerptEn ?? null,
        content: dto.content,
        contentKk: dto.contentKk ?? null,
        contentEn: dto.contentEn ?? null,
        published: dto.published ?? true,
        publishedAt
      }
    });
  }

  async update(id: string, dto: UpdateNewsDto) {
    const existing = await this.prisma.news.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('News not found');
    let slug = existing.slug;
    if (dto.title && dto.title !== existing.title) {
      slug = await this.uniqueSlug(dto.title);
    }
    const data: any = { ...dto };
    if (dto.publishedAt) data.publishedAt = new Date(dto.publishedAt);
    // Сохраняем переводы, если они переданы
    if (dto.titleKk !== undefined) data.titleKk = dto.titleKk ?? null;
    if (dto.titleEn !== undefined) data.titleEn = dto.titleEn ?? null;
    if (dto.excerptKk !== undefined) data.excerptKk = dto.excerptKk ?? null;
    if (dto.excerptEn !== undefined) data.excerptEn = dto.excerptEn ?? null;
    if (dto.contentKk !== undefined) data.contentKk = dto.contentKk ?? null;
    if (dto.contentEn !== undefined) data.contentEn = dto.contentEn ?? null;
    return this.prisma.news.update({ where: { id }, data: { ...data, slug } });
  }

  async remove(id: string) {
    await this.prisma.news.delete({ where: { id } });
    return { ok: true };
  }
}
