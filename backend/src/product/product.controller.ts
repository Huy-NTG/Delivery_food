import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         callback(null, uniqueSuffix + extname(file.originalname));
  //       },
  //     }),
  //   }),
  // )
  // create(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: any,
  // ) {
  //   const { name, quantity, price, category } = body;
  //   const image = file?.filename;

  //   // Gọi service để lưu
  //   return this.productService.create({
  //     name,
  //     quantity: +quantity,
  //     price: +price,
  //     category,
  //     image,
  //   });
  // }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { name, quantity, price, category } = body;
    const image = file?.filename;
    return this.productService.create({
      name,
      quantity: +quantity,
      price: +price,
      category,
      image,
    });
  }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }
  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.productService.findAll(+page, +limit);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { name, quantity, price, category } = body;
    const image = file?.filename;

    return this.productService.update(+id, {
      name,
      quantity: +quantity,
      price: +price,
      category,
      image,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
