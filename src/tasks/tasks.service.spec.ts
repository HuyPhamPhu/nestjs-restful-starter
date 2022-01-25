import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/upadte-task.dto';
import { TasksService } from './tasks.service';

class ApiServiceMock {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  create(userId: string, createTaskDto: CreateTaskDto) {
    return {};
  }
  findAll() {
    return [];
  }
  findOne(id: number) {
    return {};
  }
  update(id: number, userId: string, updateTaskDto: UpdateTaskDto) {
    return {};
  }
  delete(id: number, userId: string) {
    return {};
  }
  searchForTasks(search: string) {
    return {};
  }
}
describe.only('TasksService', () => {
  let tasksService: TasksService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TasksService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, ApiServiceProvider],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should call create method with expected params', async () => {
    const createPostsSpy = jest.spyOn(tasksService, 'create');
    const userId = '1';
    const dto = new CreateTaskDto();
    tasksService.create(userId, dto);
    expect(createPostsSpy).toHaveBeenCalledWith(userId, dto);
  });

  it('should call findAll method', async () => {
    const findAllSpy = jest.spyOn(tasksService, 'findAll');
    tasksService.findAll();
    expect(findAllSpy).toHaveBeenCalledWith();
  });

  it('should call findOne method with expected params', async () => {
    const findOneSpy = jest.spyOn(tasksService, 'findOne');
    const id = 1;
    tasksService.findOne(id);
    expect(findOneSpy).toHaveBeenCalledWith(id);
  });
  it('should call update method with expected params', async () => {
    const updateSpy = jest.spyOn(tasksService, 'update');
    const id = 1;
    const userId = '1';
    const dto = new UpdateTaskDto();
    tasksService.update(id, userId, dto);
    expect(updateSpy).toHaveBeenCalledWith(id, userId, dto);
  });

  it('should call delete method with expected params', async () => {
    const deleteSpy = jest.spyOn(tasksService, 'delete');
    const id = 1;
    const userId = '1';
    tasksService.delete(id, userId);
    expect(deleteSpy).toHaveBeenCalledWith(id, userId);
  });

  it('should call search method with expected params', async () => {
    const searchSpy = jest.spyOn(tasksService, 'searchForTasks');
    const search = 'a';
    tasksService.searchForTasks(search);
    expect(searchSpy).toHaveBeenCalledWith(search);
  });
});
