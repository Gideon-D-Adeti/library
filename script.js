const addABook = document.querySelector(".add-a-book");
const addBookDialog = document.querySelector(".add-book-dialog");
const cancelButton = document.querySelector(".cancel-button");

addABook.addEventListener("click", () => {
    addBookDialog.showModal();
})

cancelButton.addEventListener("click", () => {
    addBookDialog.close();
})

