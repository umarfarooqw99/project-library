let myLibrary = [
    // {
    //     title: "Harry Potter",
    //     author: "JK Rowling",
    //     pages: 400,
    //     isRead: true
    // },
    // {
    //     title: "Lord of the Rings",
    //     author: "JRR Tolkein",
    //     pages: 700,
    //     isRead: false
    // },
    // {
    //     title: "Crime and Punishment",
    //     author: "Fyodor Dostoyevsky",
    //     pages: 300,
    //     isRead: true
    // },
];

function Book(title, author, pages, isRead) {
    //constructor
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
    const table = document.querySelector('.books-table');
    const tableBody = document.querySelector('.books-table tbody');
    if(!myLibrary.length) {
        table.toggleAttribute("hidden");
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

displayBooks();

const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const isRead = document.querySelector('#isRead');
    if(!(title.value && author.value && pages.value)) return;
    if(isRead.checked) addBookToLibrary(title.value, author.value, pages.value, true);
    else addBookToLibrary(title.value, author.value, pages.value, false);
    title.value = "";
    author.value = "";
    pages.value = "";
    isRead.checked = false;
})

const showHideTable = document.querySelector('.show-hide-table');
// showHideTable.addEventListener("click", () => {
//     const tableBody = document.querySelector('.books-table');
//     tableBody.toggleAttribute("hidden");
// })

const table = document.querySelector('.books-table');
table.addEventListener("click", (event) => {
    debugger
    if(!(event.target.className == "delete")) return;
    const targetIndex = event.target.getAttribute("data-index");
    myLibrary.splice(targetIndex, 1);
    displayBooks();
})