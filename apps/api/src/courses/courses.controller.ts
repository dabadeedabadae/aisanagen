import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Controller()
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  // Публичный список
  @Get('courses')
  list(@Query('lang') lang?: string) {
    return this.courses.list({ lang });
  }

  // Публичная детальная по slug
  @Get('courses/:slug')
  bySlug(@Param('slug') slug: string, @Query('lang') lang?: string) {
    return this.courses.bySlug(slug, false, lang);
  }

  // Админка (без авторизации для простоты)
  @Post('admin/courses')
  create(@Body() dto: CreateCourseDto) {
    return this.courses.create(dto);
  }

  @Patch('admin/courses/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courses.update(id, dto);
  }

  @Delete('admin/courses/:id')
  remove(@Param('id') id: string) {
    return this.courses.remove(id);
  }
}

