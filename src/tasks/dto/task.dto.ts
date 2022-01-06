import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../task.entity';

export class TaskDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly authorId: string;

  @ApiProperty()
  readonly authorFirstName: string;

  @ApiProperty()
  readonly authorLastName: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly isDone: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.authorId = task.userId;
    this.authorFirstName = task.user.firstName;
    this.authorLastName = task.user.lastName;
    this.name = task.name;
    this.description = task.description;
    this.isDone = task.isDone;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
