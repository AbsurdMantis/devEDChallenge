import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name:string, email: string, pass: string) {
    const salt = await genSalt();
    const hashedPassword = await hash(pass, salt);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        status: true,
        isAdmin: false,
      },
    });

    const { password_hash, ...result } = user;
    return result;
  }
}