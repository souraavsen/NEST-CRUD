import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmarks } from './bookmark.entity';
import { Repository } from 'typeorm';

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
    console.log(category);
    console.log(this.bookmarkRepository.findBy({ category }));

    return this.bookmarkRepository.findBy({ category });
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

  // ======================== Using Constant Data ========================
  getBookmarks(category: string) {
    if (category) {
      return bookmarks.filter((site) => site.category === category);
    } else {
      return bookmarks;
    }
  }

  getBookmark(id: number) {
    try {
      const bookmark = bookmarks.find((obj) => obj.id === (id as any));

      if (bookmark) {
        return bookmark;
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  createBookmark(details: CreateBookmarkDto) {
    bookmarks.push({ id: bookmarks.length + 1, ...details });
    return this.getBookmarks('');
  }

  updateBookmark(id: number, updatedDetails: UpdateBookmarkDto) {
    try {
      const updates = bookmarks.map((bookmark) => {
        if (bookmark.id === (id as any)) {
          return { ...bookmark, ...updatedDetails };
        }
        return bookmark;
      });

      return updates.find((item) => item.id === (id as any));
      // return this.getBookmark(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  deleteBookmark(id: number) {
    try {
      const bookmark = bookmarks.find((obj) => obj.id === (id as any));
      if (bookmark) {
        return bookmarks.filter((site) => site.id !== (id as any));
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }
}

// Data
const bookmarks: CreateBookmarkDto[] = [
  {
    id: 1,
    title: 'Google',
    url: 'https://www.google.com',
    category: 'Search Engine',
  },
  {
    id: 2,
    title: 'GitHub',
    url: 'https://github.com',
    category: 'Version Control',
  },
  {
    id: 3,
    title: 'NestJS',
    url: 'https://nestjs.com',
    category: 'Web Framework',
  },
  {
    id: 4,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    category: 'Programming Community',
  },
  {
    id: 5,
    title: 'NextJS',
    url: 'https://nextjs.dev',
    category: 'Web Framework',
  },
  {
    id: 6,
    title: 'ReatJS',
    url: 'https://reactjs.dev',
    category: 'Web Framework',
  },
];
