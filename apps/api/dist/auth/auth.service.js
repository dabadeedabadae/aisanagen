var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service.js';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
let AuthService = class AuthService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async createInvite(email) {
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
    async findInvite(token) {
        const invite = await this.prisma.invite.findUnique({ where: { token } });
        if (!invite)
            return null;
        if (invite.usedAt)
            return null;
        if (invite.expiresAt.getTime() < Date.now())
            return null;
        return invite;
    }
    async registerByInvite(dto) {
        const invite = await this.findInvite(dto.token);
        if (!invite) {
            throw new NotFoundException('Invite not found or expired');
        }
        const exists = await this.prisma.user.findUnique({ where: { email: invite.email } });
        if (exists)
            throw new BadRequestException('User already exists');
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { email: invite.email, name: dto.name ?? null, passwordHash: hash }
        });
        await this.prisma.invite.update({ where: { token: invite.token }, data: { usedAt: new Date() } });
        return { id: user.id, email: user.email, name: user.name };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map