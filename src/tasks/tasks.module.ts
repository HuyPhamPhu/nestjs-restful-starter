import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TasksService, ...tasksProviders],
})
export class TasksModule {}
