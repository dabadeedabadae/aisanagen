import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  async createInvite(email: string) {
    const token = randomUUID();
    // 24h expiry
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.invite.create({
      data: { email, token, expiresAt }
    });

    const clientUrl = this.config.get('CLIENT_URL') || 'http://localhost:3000';
    const link = `${clientUrl.replace(/\/$/, '')}/register/${token}`;
    return { token, link, expiresAt };
  }

  async findInvite(token: string) {
    const invite = await this.prisma.invite.findUnique({ where: { token } });
    if (!invite) return null;
    if (invite.usedAt) return null;
    if (invite.expiresAt.getTime() < Date.now()) return null;
    return invite;
  }

  async registerByInvite(dto: RegisterDto) {
    const invite = await this.findInvite(dto.token);
    if (!invite) {
      throw new NotFoundException('Invite not found or expired');
    }

    const exists = await this.prisma.user.findUnique({ where: { email: invite.email } });
    if (exists) throw new BadRequestException('User already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: invite.email, name: dto.name ?? null, passwordHash: hash }
    });

    await this.prisma.invite.update({ where: { token: invite.token }, data: { usedAt: new Date() } });

    return { id: user.id, email: user.email, name: user.name };
  }
}
