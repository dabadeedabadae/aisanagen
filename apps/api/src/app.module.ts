import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { NewsModule } from './news/news.module.js';
import { CoursesModule } from './courses/courses.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    NewsModule,
    CoursesModule
  ],
})
export class AppModule {}
