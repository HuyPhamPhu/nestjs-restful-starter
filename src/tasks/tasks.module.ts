import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tasksProviders } from './tasks.providers';
import { SearchModule } from '../search/search.module';
import TasksSearchService from './tasksSearch.service';

@Module({
  imports: [DatabaseModule, SearchModule],
  controllers: [TasksController],
  providers: [TasksService, TasksSearchService, ...tasksProviders],
})
export class TasksModule {}
