import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { toSlug } from '../common/slug.js';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  private async uniqueSlug(base: string) {
    let slug = toSlug(base) || 'course';
    let i = 0;
    while (true) {
      const candidate = i === 0 ? slug : `${slug}-${i}`;
      const exists = await this.prisma.course.findUnique({ where: { slug: candidate } });
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

  async list(params: { includeDrafts?: boolean; lang?: string } = {}) {
    const where = params.includeDrafts ? {} : { published: true };
    const items = await this.prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, 
        slug: true, 
        title: true,
        titleKk: true,
        titleEn: true,
        description: true,
        descriptionKk: true,
        descriptionEn: true,
        link: true 
      }
    });
    
    const lang = params.lang || 'ru';
    const localizedItems = items.map(item => ({
      id: item.id,
      slug: item.slug,
      title: this.getLocalizedField(item, 'title', lang),
      description: this.getLocalizedField(item, 'description', lang),
      link: item.link
    }));
    
    return { items: localizedItems };
  }

  async bySlug(slug: string, includeDrafts = false, lang?: string) {
    const item = await this.prisma.course.findUnique({ where: { slug } });
    if (!item || (!includeDrafts && !item.published)) throw new NotFoundException('Course not found');
    
    const currentLang = lang || 'ru';
    return {
      id: item.id,
      slug: item.slug,
      title: this.getLocalizedField(item, 'title', currentLang),
      description: this.getLocalizedField(item, 'description', currentLang),
      link: item.link,
      published: item.published,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  }

  async create(dto: CreateCourseDto) {
    const slug = await this.uniqueSlug(dto.title);
    return this.prisma.course.create({
      data: {
        slug,
        title: dto.title,
        titleKk: dto.titleKk ?? null,
        titleEn: dto.titleEn ?? null,
        description: dto.description,
        descriptionKk: dto.descriptionKk ?? null,
        descriptionEn: dto.descriptionEn ?? null,
        link: dto.link,
        published: dto.published ?? true
      }
    });
  }

  async update(id: string, dto: UpdateCourseDto) {
    const existing = await this.prisma.course.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Course not found');
    let slug = existing.slug;
    if (dto.title && dto.title !== existing.title) {
      slug = await this.uniqueSlug(dto.title);
    }
    const data: any = { ...dto };
    // Сохраняем переводы, если они переданы
    if (dto.titleKk !== undefined) data.titleKk = dto.titleKk ?? null;
    if (dto.titleEn !== undefined) data.titleEn = dto.titleEn ?? null;
    if (dto.descriptionKk !== undefined) data.descriptionKk = dto.descriptionKk ?? null;
    if (dto.descriptionEn !== undefined) data.descriptionEn = dto.descriptionEn ?? null;
    return this.prisma.course.update({ where: { id }, data: { ...data, slug } });
  }

  async remove(id: string) {
    await this.prisma.course.delete({ where: { id } });
    return { ok: true };
  }
}

