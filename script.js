class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.addBookDiv = document.querySelector(".add-book");
    this.addBookDialog = document.querySelector(".add-book-dialog");
    this.cancelButton = document.querySelector(".cancel-button");
    this.booksContainer = document.querySelector(".books");
    this.addBookForm = this.addBookDialog.querySelector("form");

    this.addBookDiv.addEventListener("click", () => {
      this.addBookDialog.showModal();
    });

    this.cancelButton.addEventListener("click", () => {
      this.clearInputValues();
      this.addBookDialog.close();
    });

    this.addBookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addBookFromForm();
    });
  }

  getInputValues() {
    const title = this.addBookForm.querySelector("#title").value;
    const author = this.addBookForm.querySelector("#author").value;
    const pages = this.addBookForm.querySelector("#pages").value;
    const isRead = this.addBookForm.querySelector("#is-read").checked;

    return {
      title,
      author,
      pages,
      isRead,
    };
  }

  clearInputValues() {
    this.addBookForm.querySelector("#title").value = "";
    this.addBookForm.querySelector("#author").value = "";
    this.addBookForm.querySelector("#pages").value = "";
    this.addBookForm.querySelector("#is-read").checked = false;
  }

  createBook(title, author, pages, isRead) {
    return new Book(title, author, pages, isRead);
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.displayBooks();
  }

  toggleReadStatus(index) {
    this.books[index].isRead = !this.books[index].isRead;
    this.displayBooks();
  }

  displayBooks() {
    this.booksContainer.innerHTML = "";
    this.books.forEach((book, index) => {
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

      const bookEditDiv = document.createElement("div");
      bookEditDiv.classList.add("book-edit-div");

      const toggleReadButton = document.createElement("button");
      toggleReadButton.textContent = isRead ? "Mark Unread" : "Mark Read";
      toggleReadButton.addEventListener("click", () => {
        this.toggleReadStatus(index);
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        this.removeBook(index);
      });

      bookEditDiv.appendChild(removeButton);
      bookEditDiv.appendChild(toggleReadButton);
      bookDiv.appendChild(bookEditDiv);

      this.booksContainer.appendChild(bookDiv);
    });
  }

  addBookFromForm() {
    const { title, author, pages, isRead } = this.getInputValues();
    const book = this.createBook(title, author, pages, isRead);
    this.addBook(book);
    this.clearInputValues();
    this.addBookDialog.close();
  }
}

const library = new Library();
