import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
}
