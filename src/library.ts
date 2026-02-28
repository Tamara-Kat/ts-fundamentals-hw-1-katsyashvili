import type { BookId } from './types';
import { Book } from './book';

export class Library {
  private items: Map<BookId, Book> = new Map();

  add(item: Book): void {
    if (this.items.has(item.id)) {
      throw new Error('Item already exists');
    }
    this.items.set(item.id, item);
  }

  remove(id: BookId): void {
    const item = this.getBookOrThrow(id);
    if (item.getStatus() === 'borrowed') {
      throw new Error('Cannot remove borrowed item');
    }
    this.items.delete(id);
  }

  listAll(): Book[] {
    return Array.from(this.items.values());
  }

  listAvailable(): Book[] {
    return this.listAll().filter(book => book.getStatus() === 'available');
  }

  borrow(id: BookId, personName: string): void {
    this.getBookOrThrow(id).markBorrowed(personName);
  }

  return(id: BookId): void {
    this.getBookOrThrow(id).markReturned();
  }

  private getBookOrThrow(id: BookId): Book {
    const item = this.items.get(id);
    if (!item) {
      throw new Error('Book not found');
    }
    return item;
  }
}