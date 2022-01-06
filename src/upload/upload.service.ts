import { Inject, Injectable, HttpException, HttpStatus, UploadedFile, UploadedFiles } from '@nestjs/common';


@Injectable()
export class UploadService {

    async uploadedFile(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }

    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
          const fileReponse = {
            originalname: file.originalname,
            filename: file.filename,
          };
          response.push(fileReponse);
        });
        return response;
      }
}
