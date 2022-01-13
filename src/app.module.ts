import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';
import { SearchModule } from './search/search.module';
import { SocketInsideModule } from './socket-inside/socket-inside.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ELASTICSEARCH_NODE: Joi.string().required(),
      }),
    }),
    TasksModule,
    UsersModule,
    PostsModule,
    SharedModule,
    UploadModule,
    SearchModule,
    SocketInsideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
