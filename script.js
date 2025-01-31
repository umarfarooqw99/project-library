const newBook = document.querySelector('.new-book');
const closeFormBtn = document.querySelector('.cross');
const dialog = document.querySelector('dialog');
const inputs = document.querySelectorAll('input');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const isReadYes = document.querySelector('#is-read-yes');
const isReadNo = document.querySelector('#is-read-no');
const addBookBtn = document.querySelector('.add-book');
const table = document.querySelector('.books-table');
const tableBody = document.querySelector('.books-table tbody');

let myLibrary = [];
displayBooks();

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    if(!myLibrary.length) {
        table.toggleAttribute("hidden");
        return;
    }
    if(myLibrary.length && !(table.checkVisibility())) {
        table.toggleAttribute("hidden");
    }
    tableBody.innerHTML = "";

    myLibrary.map((book, index) => {
        const row = document.createElement('tr');
        const serialNo = document.createElement('td');
        const deleteButtonContainer = document.createElement('td');
        const deleteButton = document.createElement('button');

        serialNo.textContent = index+1;
        deleteButton.textContent = "Delete";
        deleteButton.dataset.index = index;
        deleteButton.className = "delete";
        deleteButtonContainer.appendChild(deleteButton);

        row.appendChild(serialNo);
        const bookAttributes = Object.keys(book);
        bookAttributes.map(attribute => {
            const rowChild = document.createElement('td');
            rowChild.className = attribute;
            rowChild.dataset.index = index;
            if(typeof book[attribute] == "boolean") {
                if(book[attribute]) rowChild.textContent = "Yes";
                else rowChild.textContent = "No";
                row.appendChild(rowChild);
                return;
            }
            rowChild.textContent = book[attribute];
            row.appendChild(rowChild);
        });
        row.appendChild(deleteButtonContainer);
        tableBody.appendChild(row);
    });
}

//Add a book
addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //form validation
    if(!(title.value && author.value && pages.value)) return;
    if(!(isReadYes.checked || isReadNo.checked)) return;

    //object creation
    if(isReadYes.checked) addBookToLibrary(title.value, author.value, pages.value, true);
    else addBookToLibrary(title.value, author.value, pages.value, false);

    //reset inputs
    inputs.forEach(input => {
        if(input.type == "text") input.value = "";
        else input.checked = false;
    });
    // title.focus();
    dialog.close();
});

//Delete a book
table.addEventListener("click", (event) => {
    if(!(event.target.className == "delete")) return;
    const targetIndex = event.target.getAttribute("data-index");
    myLibrary.splice(targetIndex, 1);
    displayBooks();
});

//Update the read status of a book
table.addEventListener("click", (event) => {
    if(!(event.target.className == "isRead")) return;
    const bookIndex = event.target.getAttribute("data-index");
    const book = myLibrary[bookIndex];
    if(event.target.textContent == "Yes") book.isRead = false;
    else book.isRead = true;
    displayBooks();
})

newBook.addEventListener("click", ()=> {
    dialog.showModal();
})

closeFormBtn.addEventListener("click", () => {
    dialog.close();
})

//create a single even listener whose logic depends upon className of target