import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { InviteDto } from './dto/invite.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('invite')
  async createInvite(@Body() body: InviteDto) {
    return this.auth.createInvite(body.email);
  }

  @Get('invite/:token')
  async getInvite(@Param('token') token: string) {
    const invite = await this.auth.findInvite(token);
    if (!invite) throw new NotFoundException('Invite not found or expired');
    return { email: invite.email };
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.auth.registerByInvite(body);
  }
}
