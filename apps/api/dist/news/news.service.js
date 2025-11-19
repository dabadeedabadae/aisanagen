var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service.js';
import { toSlug } from '../common/slug.js';
let NewsService = class NewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uniqueSlug(base) {
        let slug = toSlug(base) || 'item';
        let i = 0;
        while (true) {
            const candidate = i === 0 ? slug : `${slug}-${i}`;
            const exists = await this.prisma.news.findUnique({ where: { slug: candidate } });
            if (!exists)
                return candidate;
            i++;
        }
    }
    getLocalizedField(item, field, lang) {
        if (!lang || lang === 'ru')
            return item[field] || item[`${field}Kk`] || item[`${field}En`] || item[field];
        if (lang === 'kk')
            return item[`${field}Kk`] || item[field] || item[`${field}En`] || item[field];
        if (lang === 'en')
            return item[`${field}En`] || item[field] || item[`${field}Kk`] || item[field];
        return item[field];
    }
    async list(params) {
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
    async bySlug(slug, includeDrafts = false, lang) {
        const item = await this.prisma.news.findUnique({ where: { slug } });
        if (!item || (!includeDrafts && !item.published))
            throw new NotFoundException('News not found');
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
    async create(dto) {
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
    async update(id, dto) {
        const existing = await this.prisma.news.findUnique({ where: { id } });
        if (!existing)
            throw new NotFoundException('News not found');
        let slug = existing.slug;
        if (dto.title && dto.title !== existing.title) {
            slug = await this.uniqueSlug(dto.title);
        }
        const data = { ...dto };
        if (dto.publishedAt)
            data.publishedAt = new Date(dto.publishedAt);
        // Сохраняем переводы, если они переданы
        if (dto.titleKk !== undefined)
            data.titleKk = dto.titleKk ?? null;
        if (dto.titleEn !== undefined)
            data.titleEn = dto.titleEn ?? null;
        if (dto.excerptKk !== undefined)
            data.excerptKk = dto.excerptKk ?? null;
        if (dto.excerptEn !== undefined)
            data.excerptEn = dto.excerptEn ?? null;
        if (dto.contentKk !== undefined)
            data.contentKk = dto.contentKk ?? null;
        if (dto.contentEn !== undefined)
            data.contentEn = dto.contentEn ?? null;
        return this.prisma.news.update({ where: { id }, data: { ...data, slug } });
    }
    async remove(id) {
        await this.prisma.news.delete({ where: { id } });
        return { ok: true };
    }
};
NewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], NewsService);
export { NewsService };
//# sourceMappingURL=news.service.js.map