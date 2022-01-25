import { Test, TestingModule } from '@nestjs/testing';
import { TaskDto } from './dto/task.dto';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let tasksController: TasksController;
  let spyService: TasksService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TasksService,
      useFactory: () => ({
        findAll: jest.fn().mockReturnValue([]),
        findOne: jest.fn().mockReturnValue({}),
        create: jest.fn().mockReturnValue({}),
        update: jest.fn().mockReturnValue({}),
        delete: jest.fn().mockReturnValue({}),
        searchForTasks: jest.fn().mockReturnValue({}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, ApiServiceProvider],
    }).compile();
    spyService = app.get<TasksService>(TasksService);
    tasksController = app.get<TasksController>(TasksController);
  });

  const task: TaskDto = {
    id: 1,
    authorId: '1',
    authorFirstName: 'Hoang',
    authorLastName: 'Binh',
    description: 'abc',
    name: 'zzz',
    createdAt: new Date('2022-01-10 19:03:13'),
    updatedAt: new Date('2022-01-10 19:03:13'),
    isDone: false,
  };
  const req = { user: { id: '1' } };

  describe('findAll', () => {
    it('findAll should been called', async () => {
      tasksController.findAll();
      expect(spyService.findAll).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('findAll should return all tasks', async () => {
      const result: any = ['test'];
      jest.spyOn(spyService, 'findAll').mockImplementation(() => result);
      expect(await tasksController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('findOne should been called', async () => {
      tasksController.findOne(task.id);
      expect(spyService.findOne).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('findOne should return one task', async () => {
      const result: any = {
        id: 1,
        authorId: '1',
        authorFirstName: 'Hoang',
        authorLastName: 'Binh',
        description: 'abc',
        name: 'zzz',
        createdAt: new Date('2022-01-10 19:03:13'),
        updatedAt: new Date('2022-01-10 19:03:13'),
        isDone: false,
      };
      jest.spyOn(spyService, 'findOne').mockImplementation(() => result);
      expect(await tasksController.findOne(undefined)).toBe(result);
    });
  });

  describe('create', () => {
    it('create should been called', async () => {
      tasksController.create(task, req);
      expect(spyService.create).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('create should create task', async () => {
      const result: any = {};
      jest.spyOn(spyService, 'create').mockImplementation(() => result);
      expect(await tasksController.create(task, req)).toBe(result);
    });
  });

  describe('update', () => {
    it('update should been called', async () => {
      tasksController.update(task.id, req, task);
      expect(spyService.update).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('update should update task', async () => {
      const result: any = {};
      jest.spyOn(spyService, 'update').mockImplementation(() => result);
      expect(await tasksController.update(task.id, req, task)).toBe(result);
    });
  });

  describe('delete', () => {
    it('delete should been called', async () => {
      tasksController.delete(task.id, req);
      expect(spyService.delete).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('delete should delete task', async () => {
      const result: any = {};
      jest.spyOn(spyService, 'delete').mockImplementation(() => result);
      expect(await tasksController.delete(task.id, req)).toBe(result);
    });
  });

  describe('searchForTasks', () => {
    it('searchForTasks should been called', async () => {
      const search = 'a';
      tasksController.searchForTasks(search);
      expect(spyService.searchForTasks).toHaveBeenCalled();
    });
  });

  describe('searchForTasks', () => {
    it('searchForTasks should return tasks', async () => {
      const result: any = ['test'];
      const search = 'a';
      jest.spyOn(spyService, 'searchForTasks').mockImplementation(() => result);
      expect(await tasksController.searchForTasks(search)).toBe(result);
    });
  });
});
