import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NewsService } from './news.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';


@Controller()
export class NewsController {
  constructor(private readonly news: NewsService) {}

  // Публичный список (пагинация)
  @Get('news')
  list(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.news.list({ page: Number(page), limit: Number(limit) });
  }

  // Публичная детальная по slug
  @Get('news/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.news.bySlug(slug);
  }

  // Админка (без авторизации для простоты)
  @Post('admin/news')
  create(@Body() dto: CreateNewsDto) {
    return this.news.create(dto);
  }

  @Patch('admin/news/:id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.news.update(id, dto);
  }

  @Delete('admin/news/:id')
  remove(@Param('id') id: string) {
    return this.news.remove(id);
  }

  // Загрузка изображения
  @Post('admin/upload')
  @UseInterceptors(
    FileInterceptor('file', {
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
        } else {
          cb(new Error('Только изображения разрешены'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'Файл не загружен' };
    }
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}
