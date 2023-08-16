import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authenticated/authenticated.guard';
import { BookmarkService } from './bookmark.services';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';

@ApiTags('Bookmarks')
@Controller('api/bookmarks')
@UseGuards(AuthenticatedGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // GET Bookmarks from query params
  @Get()
  // @ApiOkResponse({
  //   type: CreateBookmarkDto,
  //   description: 'Get bookmarks',
  // })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'category', required: false })
  async getBookmarksFromQuery(@Query('category') category: string) {
    // const service = new BookmarkService();
    return await this.bookmarkService.findAll(category);
    // return this.bookmarkService.getBookmarks(category);
  }

  // GET single Bookmarks
  @Get(':id')
  @ApiNotFoundResponse()
  getSingleBookmarks(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.findOne(id);
    // return this.bookmarkService.getBookmark(id);
  }

  // Create Bookmark
  @Post()
  createBookmarks(
    @Body(new ValidationPipe()) bookmarkDetails: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(bookmarkDetails);
    // return this.bookmarkService.createBookmark(bookmarkDetails);
  }

  // update Bookmark
  @Put(':id')
  @ApiNotFoundResponse()
  updateBookmarks(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) bookmarkDetails: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateOne(id, bookmarkDetails);
    // return this.bookmarkService.updateBookmark(id, bookmarkDetails);
  }

  // Delete Bookmark
  @Delete(':id')
  @ApiNotFoundResponse()
  deleteBookmarks(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.removeOne(id);
    // return this.bookmarkService.deleteBookmark(id);
  }
}
