
import { Injectable, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { response_file } from 'src/models/utility.dto';
@Injectable()
export class UploadsService {
  async uploadFileToPost(file: Express.Multer.File, request: any): Promise<response_file> {
    const currentWorkingDir = process.cwd();
    const uploadDirectory = join(currentWorkingDir, 'uploads', 'post', request.user.code);
    if (!existsSync(uploadDirectory)) {
      mkdirSync(uploadDirectory, { recursive: true });
    }
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file data');
    }
    const fileName = `${Date.now()}${extname(file.originalname)}`;
    const filePath = join(uploadDirectory, fileName);
    try {
      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer);
      writeStream.end();
      const baseUrl = process.env.BASE_URL;
      const relativePath = filePath.replace(currentWorkingDir, '').replace(/\\/g, '/');
      const fullUrl = `${baseUrl}${relativePath}`;
      return {
        statusCode: HttpStatus.OK,
        url: fullUrl,
        message: "Upload file successfully!"
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Failed to upload file',
            details: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An internal server error occurred',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async uploadProfileImage(file: Express.Multer.File, code: string): Promise<response_file> {
    const currentWorkingDir = process.cwd();
    const uploadDirectory = join(currentWorkingDir, 'uploads', 'profile', code);
    if (!existsSync(uploadDirectory)) {
      mkdirSync(uploadDirectory, { recursive: true });
    }
    if (!file || !file.buffer) {
      throw new BadRequestException('Invalid file data');
    }
    const fileName = `${Date.now()}${extname(file.originalname)}`;
    const filePath = join(uploadDirectory, fileName);
    try {
      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer);
      writeStream.end();
      const baseUrl = process.env.BASE_URL;
      const relativePath = filePath.replace(currentWorkingDir, '').replace(/\\/g, '/');
      const fullUrl = `${baseUrl}${relativePath}`;
      return {
        statusCode: HttpStatus.OK,
        url: fullUrl,
        message: "Upload file successfully!"
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Failed to upload file',
            details: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An internal server error occurred',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
