import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getPosts(data: Prisma.UserWhereUniqueInput): Promise<Array<Post>> {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: data.id,
      },
    });

    return posts;
  }
}
