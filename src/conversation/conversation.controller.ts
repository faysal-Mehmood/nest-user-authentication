import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('v1/api')
@ApiTags('Conversation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')

export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @Post('user/:uid/conversation')
  async createByUserId(
    @Param('uid') uid: number,
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.conversationService.createByUserId(uid, createConversationDto);
  }

  @Get('user/:id/conversation')

  getByUserId(@Query('uid') uid: number): Promise<Conversation[]> {
    return this.conversationService.findByUserId(uid);
  }

  @Get('user/:uid/conversation/:id')
  getByUserIdAndConversationId(
    @Param('uid') uid: number,
    @Param('id') id: number,
  ): Promise<Conversation | null> {
    return this.conversationService.findByUserIdAndConversationId(uid, id);
  }


  @Put('user/:uid/conversation:id')
  async updateByUserIdAndConversationId(
    @Param('uid') userId: number,
    @Param('id') id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    const updatedConversation = await this.conversationService.updateByUserIdAndConversationId(
      userId,
      id,
      updateConversationDto,
    );

    if (!updatedConversation) {
      throw new NotFoundException(`Conversation with id ${id} for user ${userId} not found.`);
    }

    return updatedConversation;
  }

  @Delete('conversation/:id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}
