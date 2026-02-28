import { Book } from './book';
import { Library } from './library';

// Створюємо бібліотеку
const library = new Library();

// Створюємо книгу (параметри: id, назва, автор, рік, жанр)
const myBook = new Book('1', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'fiction');

// Додаємо в бібліотеку
library.add(myBook);

// Перевіряємо статус
console.log(myBook.getInfo());

// Позичаємо книгу
library.borrow('1', 'Victoria');
console.log(myBook.getInfo());

// Повертаємо книгу
library.return('1');
console.log(myBook.getInfo());

console.log('Вітаю! Усі системи працюють стабільно.');