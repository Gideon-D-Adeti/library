const addBook = document.querySelector(".add-book");
const addBookDialog = document.querySelector(".add-book-dialog");
const cancelButton = document.querySelector(".cancel-button");
const books = document.querySelector(".books");

const addBookForm = addBookDialog.querySelector("form");

const libraryBooks = [];

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function getInputValues() {
  const title = addBookForm.querySelector("#title").value;
  const author = addBookForm.querySelector("#author").value;
  const pages = addBookForm.querySelector("#pages").value;
  const isRead = addBookForm.querySelector("#is-read").checked;

  return {
    title: title,
    author: author,
    pages: pages,
    isRead: isRead,
  };
}

function clearInputValues() {
  addBookForm.querySelector("#title").value = "";
  addBookForm.querySelector("#author").value = "";
  addBookForm.querySelector("#pages").value = "";
  addBookForm.querySelector("#is-read").checked = false;
}

function createBook(title, author, pages, isRead) {
  return new Book(title, author, pages, isRead);
}

function addBookToLibraryBooks(book) {
  libraryBooks.push(book);
}

function displayBooks(libraryBooks) {
  books.innerHTML = "";
  libraryBooks.map((book) => {
    const { title, author, pages, isRead } = book;

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titleHeading = document.createElement("h3");
    titleHeading.textContent = title;
    bookDiv.appendChild(titleHeading);

    const authorParagraph = document.createElement("p");
    authorParagraph.textContent = `Author: ${author}`;
    bookDiv.appendChild(authorParagraph);

    const pagesParagraph = document.createElement("p");
    pagesParagraph.textContent = `Pages: ${pages}`;
    bookDiv.appendChild(pagesParagraph);

    const readStatusParagraph = document.createElement("p");
    readStatusParagraph.textContent = `Read: ${isRead ? "Yes" : "No"}`;
    bookDiv.appendChild(readStatusParagraph);

    books.appendChild(bookDiv);
  });
}

addBook.addEventListener("click", () => {
  addBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
  addBookDialog.close();
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const { title, author, pages, isRead } = getInputValues();

  const book = createBook(title, author, pages, isRead);

  addBookToLibraryBooks(book);

  displayBooks(libraryBooks);
  clearInputValues();
  addBookDialog.close();
});
