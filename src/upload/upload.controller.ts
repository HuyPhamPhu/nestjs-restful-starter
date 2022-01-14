import { UploadService } from './upload.service';
import { extname } from 'path';
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from './file-upload.utils';
import { GlobalService } from '../utils/global.service';
import { AtGuard } from '../common/guards';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: GlobalService.rootPath,
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Date.now();
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Req() request) {
    return this.uploadService.uploadedFile(request.user.id, file);
  }

  @Post('multiple')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: GlobalService.rootPath,
        filename: (request, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Date.now();
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Req() request) {
    return this.uploadService.uploadMultipleFiles(request.user.id, files);
  }
}
