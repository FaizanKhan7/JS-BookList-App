// Book class: reprensent a book - everytime we create a book it's going to instantiate a book object

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: Handle UI Tasks - so, anything in the user interface, when a book is displayed on the table or removes or we show an alert, we use UI class.

class UI {
    static displayBooks() {
        const StoredBooks = [{
                title: 'Zero To One',
                author: 'Peter Thiel',
                isbn: '9783593424941'
            },
            {
                title: 'The Monk Who Sold His Ferrari',
                author: 'Robin Sharma',
                isbn: '9780694520503'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
        // just to reiterate we have the hardcoded data(storedBooks)array, where we are setting that array to books and then we're looping through and calling the method and passing the book. 
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        </td>
        <td><i class="fas fa-trash-alt" class="btn-remove delete"></i>
        `;
        // we have our list, which we grabed from the DOM and created the new row which has all the stuff in it. so, now we just need to append the row to the list

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


//Store class - which takes care of storage(LocalStorage within the browser)


// Events 

// Event: Display Book 
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event: Add a Book

/*Since we have addBookToList method in the UI, so we can utilize the method again, not just with display books but also when we add a book when we hit submit. so to do that we need to handle collecting the data from the form, we need to instantiating a new book and then calling the add to list method . */

document.querySelector('#book-form').addEventListener('submit', (e) => {
        // prevet actual submit
        e.preventDefault();
        // Get form value
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;
        // once we get these values we want to instantiate a book from the Book Class, since it is not static we need to instantiate a book too add a book.

        // Instantiate book
        const book = new Book(title, author, isbn);
        // console.log(book);
        // we get a book object

        // Add Book to UI
        UI.addBookToList(book);

        // Clear Feilds
        UI.clearFields()
    })
    // Event: Remove a Book