import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    PostsModule,
    SharedModule,
    UploadModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
