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

  async list(params: { page?: number; limit?: number; includeDrafts?: boolean }) {
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
        select: { id: true, slug: true, title: true, imageUrl: true, excerpt: true, publishedAt: true }
      })
    ]);
    return { items, page, limit, total, pages: Math.ceil(total / limit) };
  }

  async bySlug(slug: string, includeDrafts = false) {
    const item = await this.prisma.news.findUnique({ where: { slug } });
    if (!item || (!includeDrafts && !item.published)) throw new NotFoundException('News not found');
    return item;
  }

  async create(dto: CreateNewsDto) {
    const slug = await this.uniqueSlug(dto.title);
    const publishedAt = dto.publishedAt ? new Date(dto.publishedAt) : new Date();
    return this.prisma.news.create({
      data: {
        slug,
        title: dto.title,
        imageUrl: dto.imageUrl ?? null,
        excerpt: dto.excerpt ?? null,
        content: dto.content,
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
    return this.prisma.news.update({ where: { id }, data: { ...data, slug } });
  }

  async remove(id: string) {
    await this.prisma.news.delete({ where: { id } });
    return { ok: true };
  }
}
