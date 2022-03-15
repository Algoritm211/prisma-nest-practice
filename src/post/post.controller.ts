import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() postData: createPostDto) {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.post({ id: +id });
  }

  @Put('publish/:id')
  async publish(@Param('id') id: string) {
    return this.postService.updatePost({
      where: { id: +id },
      data: { published: true },
    });
  }
}
