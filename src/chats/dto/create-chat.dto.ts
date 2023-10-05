import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsUrl } from 'class-validator';
import { ChatType } from '../entities/chat.entity';

export class CreateChatDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  audioUrl: string;


  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sorted: number;


  @ApiProperty()
  @IsOptional()
  @IsEnum(ChatType)
  type: ChatType;

  // Add other properties if needed
}