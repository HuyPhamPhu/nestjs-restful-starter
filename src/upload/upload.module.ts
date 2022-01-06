import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  }),DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: []
})
export class UploadModule {}
