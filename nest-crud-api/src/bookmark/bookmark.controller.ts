import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('bookmark')
export class BookmarkController {
  // GET all Bookmarks
  @Get()
  getBookmarks() {
    return 'Get All Bookmarks';
  }

  // GET single Bookmarks
  @Get(':id')
  getSingleookmarks(@Param('id') id: string | number) {
    return { id: id };
  }

  // Create Bookmark
  @Post()
  createBookmarks() {
    return 'Add Bookmark';
  }

  // update Bookmark
  @Put(':id')
  updateBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }

  // Delte Bookmark
  @Delete(':id')
  deleteBookmarks(@Param('id') id: string | number) {
    return { id: id };
  }
}
