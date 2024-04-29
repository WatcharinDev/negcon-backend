import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { AuthGuard } from 'src/auth.guard';
import { response_file } from 'src/models/utility.dto';
@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) { }

  @Post('post/image')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async PostFileUploadController(@UploadedFile() file: Express.Multer.File, @Req() request): Promise<response_file> {
    console.log(request)
    console.log(file)
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadsService.uploadFileToPost(file, request) as unknown as response_file
  }

  @Post('profile/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async ProfileImageController (@UploadedFile() file: Express.Multer.File, @Req() request): Promise<response_file> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadsService.uploadProfileImage(file, request) as unknown as response_file
  }
}
