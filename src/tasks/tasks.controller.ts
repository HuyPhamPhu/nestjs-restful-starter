import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Task as TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/upadte-task.dto';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: [TaskDto] })
  findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskDto })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<TaskDto> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request,
  ): Promise<TaskEntity> {
    return this.tasksService.create(request.user.id, createTaskDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: TaskEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, request.user.id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
  ): Promise<TaskEntity> {
    return this.tasksService.delete(id, request.user.id);
  }
}
