import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './userDTO';
import { userMapper } from './userMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        isAdmin: true,
        password_hash: false,

      },
    });
    return users.map(user => userMapper(user));
  }

  async getUser(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        isAdmin: true,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    return userMapper(user);
  }

  async updateUser(id: number, userDTO: UserDTO): Promise<UserDTO> {
    const { email, name, isAdmin, status } = userDTO;

    // Check if the user exists
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    // Update the user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        isAdmin,
        status,
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        isAdmin: true,
      },
    });

    return userMapper(updatedUser);
  }

  async deleteUser(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        isAdmin: true,
      },
    });

    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.delete({ where: { id } });

    return userMapper(user);
  }
}
