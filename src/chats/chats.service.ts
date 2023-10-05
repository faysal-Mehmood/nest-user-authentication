import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { ConversationService } from 'src/conversation/conversation.service';
import { UsersService } from 'src/users/users.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly usersService: UsersService,
    private readonly conversationService: ConversationService,
  ) { }

  async createByUserIdAndConversationId(
    userId: number,
    conversationId: number,
    createChatDto: CreateChatDto,
  ): Promise<Chat | null> {
    // Validate if the user exists
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`There is no user existing against this ${userId}.`);
    }

    // Validate if the conversation exists and belongs to the user
    const conversation = await this.conversationService.findByUserIdAndConversationId(userId, conversationId)

    if (!conversation) {
      return null;
    }

    // Create and save the chat
    const chat = this.chatRepository.create({
      ...createChatDto,
      conversation,
    });

    return this.chatRepository.save(chat);
  }

  async findByConversationId(conversationId: number): Promise<Chat[]> {
    return this.chatRepository.find({ where: { conversation: { id: conversationId } } });
  }

  async findByConversationAndChatId(conversationId: number, chatId: number): Promise<Chat | null> {
    const chat = await this.chatRepository.findOne({
      where: { conversation: { id: conversationId }, id: chatId },
    });

    if (!chat) {
      throw new NotFoundException(`Chat with id ${chatId} in conversation ${conversationId} not found.`);
    }

    return chat;
  }

  async updateByConversationAndChatId(
    conversationId: number,
    chatId: number,
    updateChatDto: UpdateChatDto,
  ): Promise<Chat | null> {
    const chat = await this.chatRepository.findOne({
      where: { conversation: { id: conversationId }, id: chatId },
    });

    if (!chat) {
      return null; // Chat not found
    }

    // Update the chat with the provided data
    Object.assign(chat, updateChatDto);

    return this.chatRepository.save(chat);
  }

  async remove(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
