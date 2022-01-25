import { CreateTaskDto } from './dto/create-task.dto';
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
  Query,
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
import { AtGuard } from '../common/guards';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: [TaskDto] })
  findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Get('search')
  searchForTasks(@Query('search') search: string) {
    if (search) {
      return this.tasksService.searchForTasks(search);
    }
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
  @UseGuards(AtGuard)
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
  @UseGuards(AtGuard)
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
  @UseGuards(AtGuard)
  delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() request,
  ): Promise<void> {
    return this.tasksService.delete(id, request.user.id);
  }
}
