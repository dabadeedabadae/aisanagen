import { IsBoolean, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MaxLength(180)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  titleKk?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  titleEn?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerptKk?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerptEn?: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  contentKk?: string;

  @IsOptional()
  @IsString()
  contentEn?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsDateString()
  publishedAt?: string; // можно не передавать — тогда поставим now()
}
