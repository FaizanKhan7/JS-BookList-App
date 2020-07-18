// Book class: reprensent a book - everytime we create a book it's going to instantiate a book object

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: Handle UI Tasks - so, anything in the user interface, when a book is displayed on the table or removed or we show an alert, we use UI class.

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        // const StoredBooks = [{
        //         title: 'Zero To One',
        //         author: 'Peter Thiel',
        //         isbn: '9783593424941'
        //     },
        //     {
        //         title: 'The Monk Who Sold His Ferrari',
        //         author: 'Robin Sharma',
        //         isbn: '9780694520503'
        //     }
        // ];
        // const books = StoredBooks;

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
        <td><i class="fas fa-trash-alt btn-remove delete"></i>
        `;
        // we have our list, which we grabed from the DOM and created the new row which has all the stuff in it. so, now we just need to append the row to the list

        list.appendChild(row);
    }

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Disappear alert in 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


//Store class - which takes care of storage(LocalStorage within the browser)
/* local storage stores basically the key-value pairs.
we'll be havving an item called books which will be a string version of the entire array of books. we can't store objects in local storage, it has to be a string. so before we add to local storage we have to stringify it and then to pull it out we have to parse it. */
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

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

    //Validation
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill all the fields', 'validate');
    } else {

        // Instantiate book
        const book = new Book(title, author, isbn);
        // console.log(book);
        // we get a book object

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to LocalStorage
        Store.addBook(book);

        // Show alert message
        UI.showAlert('Book Added', 'success');

        // Clear Feilds
        UI.clearFields();
    }

});


// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);

    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // this will give us the isbn, which will be passed in to remove books.

    // Show alert message
    UI.showAlert('Book Removed', 'delete-book');
});