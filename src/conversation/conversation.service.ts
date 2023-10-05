import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) { }


  async createByUserId(userId: number, createConversationDto: CreateConversationDto): Promise<Conversation> {
    // You may want to validate if the user with userId exists before creating the conversation
    // You can use a user service to perform this validation

    const conversation = this.conversationRepository.create({
      ...createConversationDto,
      user: { id: userId }, // Assign the user to the conversation
    });

    return this.conversationRepository.save(conversation);
  }

  async findByUserId(userId: number): Promise<Conversation[]> {
    return this.conversationRepository.find({ where: { user: { id: userId } } });
  }

  async findByUserIdAndConversationId(userId: number, conversationId: number): Promise<Conversation | null> {
    const conversation = await this.conversationRepository.findOne({
      where: { user: { id: userId }, id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with id ${conversationId} for user ${userId} not found.`);
    }

    return conversation;
  }



  async updateByUserIdAndConversationId(
    userId: number,
    conversationId: number,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    const conversation = await this.conversationRepository.findOne({
      where: { user: { id: userId }, id: conversationId },
    });

    if (!conversation) {
      return null; // Conversation not found
    }

    // Update the conversation with the provided data
    Object.assign(conversation, updateConversationDto);

    return this.conversationRepository.save(conversation);
  }

  async remove(id: number): Promise<void> {
    await this.conversationRepository.delete(id);
  }
}
