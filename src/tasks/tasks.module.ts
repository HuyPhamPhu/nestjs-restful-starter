import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tasksProviders } from './tasks.providers';
import { SearchModule } from '../search/search.module';
import TasksSearchService from './tasksSearch.service';

@Module({
  imports: [DatabaseModule, SearchModule],
  controllers: [TaskController],
  providers: [TasksService, TasksSearchService, ...tasksProviders],
})
export class TasksModule {}
