import type { BookId, Genre, LoanStatus } from './types';

export class Book {
  public id: BookId;
  public title: string;
  public author: string;
  public year: number;
  public genre: Genre;

  private status: LoanStatus = 'available';
  private borrowedBy: string | null = null;

  constructor(idOrOpts: any, title?: string, author?: string, year?: number, genre?: Genre) {
    if (idOrOpts && typeof idOrOpts === 'object') {
      this.id = idOrOpts.id;
      this.title = idOrOpts.title;
      this.author = idOrOpts.author;
      this.year = idOrOpts.year;
      this.genre = idOrOpts.genre;
    } else {
      this.id = idOrOpts;
      this.title = title || '';
      this.author = author || '';
      this.year = year || 0;
      this.genre = genre || ('Fiction' as Genre);
    }
  }

  getStatus(): LoanStatus {
    return this.status;
  }

  markBorrowed(personName: string): void {
    if (this.status === 'borrowed') {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }
    this.status = 'borrowed';
    this.borrowedBy = personName;
  }

  markReturned(): void {
    if (this.status === 'available') {
      throw new Error('Already available');
    }
    this.status = 'available';
    this.borrowedBy = null;
  }

  getInfo(): string {
    // Якщо книга позичена
    if (this.status === 'borrowed') {
      return `Borrowed by ${this.borrowedBy}`;
    }
    
    // Якщо вільна — СУВОРИЙ ФОРМАТ:
    // Зверни увагу: тут довге тире — (Alt+0151) і квадратні дужки [Available]
    return `${this.title} — ${this.author} (${this.year}), ${this.genre} [Available]`;
  }
}
