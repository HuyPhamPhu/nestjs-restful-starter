import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  @Length(1, 60)
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  readonly isDone: boolean;
}
