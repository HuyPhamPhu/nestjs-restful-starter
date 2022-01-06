import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Length(1, 60)
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
