import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';


@ApiTags('Chats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('v1/api')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post('user/:uid/conversation/:cid')
  async createByUserIdAndConversationId(
    @Param('uid') uid: number,
    @Param('cid') cid: number,
    @Body() createChatDto: CreateChatDto,
  ): Promise<Chat> {
    const createdChat = await this.chatsService.createByUserIdAndConversationId(
      uid,
      cid,
      createChatDto,
    );

    if (!createdChat) {
      throw new NotFoundException(
        `User ${uid} or Conversation ${cid} not found.`,
      );
    }

    return createdChat;
  }

  @Get('conversation/:cid/chats')
  getChatsByConversationId(@Param('cid') conversationId: number): Promise<Chat[]> {
    return this.chatsService.findByConversationId(conversationId);
  }

  @Get('conversation/:cid/chats/:chatId')
  getChatByConversationAndChatId(
    @Param('cid') cid: number,
    @Param('chatId') chatId: number,
  ): Promise<Chat | null> {
    return this.chatsService.findByConversationAndChatId(cid, chatId);
  }

  @Put('conversation/:conversationId/chats/:chatId')
  async updateChatByConversationAndChatId(
    @Param('cid') cid: number,
    @Param('chatId') chatId: number,
    @Body() updateChatDto: UpdateChatDto,
  ): Promise<Chat | null> {
    const updatedChat = await this.chatsService.updateByConversationAndChatId(
      cid,
      chatId,
      updateChatDto,
    );

    if (!updatedChat) {
      throw new NotFoundException(`Chat with id ${chatId} in conversation ${cid} not found.`);
    }

    return updatedChat;
  }

  @Delete('chats/:id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
