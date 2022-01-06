import { UpdateTaskDto } from './dto/upadte-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { TaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: typeof Task,
  ) {}

  async findAll() {
    const tasks = await this.tasksRepository.findAll<Task>({
      include: [User],
    });
    return tasks.map((task) => new TaskDto(task));
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findByPk<Task>(id, {
      include: [User],
    });
    if (!task) {
      throw new HttpException('No task found', HttpStatus.NOT_FOUND);
    }
    return new TaskDto(task);
  }

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.userId = userId;
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    return task.save();
  }

  private async getUserTask(id: number, userId: string) {
    const task = await this.tasksRepository.findByPk<Task>(id);
    if (!task) {
      throw new HttpException('No task found', HttpStatus.NOT_FOUND);
    }
    if (task.userId !== userId) {
      throw new HttpException(
        'You are unauthorized to manage this task',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return task;
  }

  async update(id: number, userId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.getUserTask(id, userId);
    task.name = updateTaskDto.name || task.name;
    task.description = updateTaskDto.description || task.description;
    task.isDone = updateTaskDto.isDone;
    return task.save();
  }

  async delete(id: number, userId: string) {
    const task = await this.getUserTask(id, userId);
    await task.destroy();
    return task;
  }
}
