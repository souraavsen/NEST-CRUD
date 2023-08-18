import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmarks } from './entities/bookmark.entity';
import { Repository } from 'typeorm';

// A service class that provides CRUD operations for managing bookmarks.

// Methods:
// - create(createBookmarkDto: CreateBookmarkDto): Creates a new bookmark by saving the provided data to the database.
// - findAll(category: string): Retrieves all bookmarks in the specified category from the database.
// - findAllCategories(): Retrieves all categories of bookmarks from the database.
// - findOne(id: number): Retrieves a specific bookmark by its ID from the database.
// - updateOne(id: number, updateBookmarkDto: UpdateBookmarkDto): Updates a specific bookmark with the provided data in the database.
// - removeOne(id: number): Deletes a specific bookmark from the database.
// - getBookmarks(category: string): Retrieves all bookmarks in the specified category from the constant data.
// - getBookmark(id: number): Retrieves a specific bookmark by its ID from the constant data.
// - createBookmark(details: CreateBookmarkDto): Creates a new bookmark by adding the provided data to the constant data.
// - updateBookmark(id: number, updatedDetails: UpdateBookmarkDto): Updates a specific bookmark with the provided data in the constant data.
// - deleteBookmark(id: number): Deletes a specific bookmark from the constant data.

@Injectable({})
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmarks)
    private bookmarkRepository: Repository<Bookmarks>,
  ) {}

  create(createBookmarkDto: CreateBookmarkDto) {
    const newBookmark = this.bookmarkRepository.create(createBookmarkDto);
    return this.bookmarkRepository.save(newBookmark);
  }

  findAll(category: string) {
    return this.bookmarkRepository.findBy({ category });
  }

  async findAllCategories() {
    const allBookmarks = await this.bookmarkRepository.find();
    const categories = allBookmarks.map((bookmark) => {
      return bookmark.category;
    });

    return [...new Set(categories)];
  }

  findOne(id: number) {
    return this.bookmarkRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    // return this.bookmarkRepository.update(id, updateBookmarkDto);

    const bookmark = await this.findOne(id);
    if (bookmark) {
      return this.bookmarkRepository.save({
        ...bookmark,
        ...updateBookmarkDto,
      });
    } else {
      throw new NotFoundException();
    }
  }
  async removeOne(id: number) {
    // return this.bookmarkRepository.delete(id);

    const bookmark = await this.findOne(id);
    if (bookmark) {
      return this.bookmarkRepository.remove(bookmark);
    } else {
      throw new NotFoundException();
    }
  }
}
