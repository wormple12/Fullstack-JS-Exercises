// a
interface IBook {
  title: string;
  readonly author: string;
  published?: Date;
  pages?: number;
}

// b
function printBook(book: IBook) {
  console.log(JSON.stringify(book));
}

const book01 = {
  title: "Swipsey",
  author: "Swopsey",
  published: new Date(),
  pages: 2
};
printBook(book01);

// c
// Duck Typing compares object types by comparing that the amount and types of fields
// in the required object/interface type is similar in another given object

// d
const book02: IBook = {
  title: "Swashbucklee",
  author: "Swopsey"
};
printBook(book02);

// e
// book02.author = "Swillespie";
// TypeScript doesnt allow changing readonly fields

// f
class Book implements IBook {
  title: string;
  author: string;
  published?: Date;
  pages?: number;

  constructor(title: string, author: string, published?: Date, pages?: number) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
  }
}
const book03 = new Book("Cloverfield", "Kim Possible", undefined, 44);
printBook(book03);
