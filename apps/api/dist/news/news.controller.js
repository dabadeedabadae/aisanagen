var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from 'path';
import { NewsService } from './news.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';
let NewsController = class NewsController {
    constructor(news) {
        this.news = news;
    }
    // Публичный список (пагинация)
    list(page, limit, lang) {
        return this.news.list({ page: Number(page), limit: Number(limit), lang });
    }
    // Публичная детальная по slug
    bySlug(slug, lang) {
        return this.news.bySlug(slug, false, lang);
    }
    // Админка (без авторизации для простоты)
    create(dto) {
        return this.news.create(dto);
    }
    update(id, dto) {
        return this.news.update(id, dto);
    }
    remove(id) {
        return this.news.remove(id);
    }
    // Загрузка изображения
    uploadFile(file) {
        if (!file) {
            return { error: 'Файл не загружен' };
        }
        return {
            url: `/uploads/${file.filename}`,
            filename: file.filename,
        };
    }
};
__decorate([
    Get('news'),
    __param(0, Query('page')),
    __param(1, Query('limit')),
    __param(2, Query('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "list", null);
__decorate([
    Get('news/:slug'),
    __param(0, Param('slug')),
    __param(1, Query('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "bySlug", null);
__decorate([
    Post('admin/news'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateNewsDto]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "create", null);
__decorate([
    Patch('admin/news/:id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateNewsDto]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "update", null);
__decorate([
    Delete('admin/news/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "remove", null);
__decorate([
    Post('admin/upload'),
    UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                cb(null, true);
            }
            else {
                cb(new Error('Только изображения разрешены'), false);
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    })),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "uploadFile", null);
NewsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [NewsService])
], NewsController);
export { NewsController };
//# sourceMappingURL=news.controller.js.map