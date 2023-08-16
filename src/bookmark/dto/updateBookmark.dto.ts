import { MinLength } from 'class-validator';

export class UpdateBookmarkDto {
  title?: string;
  url?: string;
  @MinLength(3)
  category?: string;
}
