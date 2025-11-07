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
                select: { id: true, slug: true, title: true, imageUrl: true, excerpt: true, publishedAt: true }
            })
        ]);
        return { items, page, limit, total, pages: Math.ceil(total / limit) };
    }
    async bySlug(slug, includeDrafts = false) {
        const item = await this.prisma.news.findUnique({ where: { slug } });
        if (!item || (!includeDrafts && !item.published))
            throw new NotFoundException('News not found');
        return item;
    }
    async create(dto) {
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