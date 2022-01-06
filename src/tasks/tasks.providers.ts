import { Task } from './task.entity';

export const tasksProviders = [{ provide: 'TasksRepository', useValue: Task }];
