// kreianje klase Book
class Book {
    // konstrurkorska metoda sa 3 parametra
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this. isbn = isbn;
    }
}
// kreiranje klase UI
class UI {
    // Metoda za kreiranje reda
    createBookRow(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
            <a href="#" class="edit">Izmeni</a>
            <a href="" class="delete">X</a>
            </td>
        `;
        return row;
    }
    // Metoda za dodavanje knjige u listu
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = this.createBookRow(book);
        list.appendChild(row)
    }
    // Metoda za izmenu postojece knjige
    editBook(editBtn) {
        const row = editBtn.closest('tr');
        document.getElementById('edit-title').value = row.cells[0].textContent;
        document.getElementById('edit-author').value = row.cells[1].textContent;
        document.getElementById('edit-isbn').value = row.cells[2].textContent;
        // Metoda za priakzivanje modalnog prozora
        document.getElementById('editModal').style.display = 'block';
    }

    // Metoda za proveru da li knjiga vec postoji
    isBookExists(isbn) {
        const list = document.getElementById('book-list');
        const rows = list.querySelectorAll('tr');
        return Array.from(rows).some(row => row.cells[2].textContent === isbn);
    }
    // Kreiranje metode showAlert klase UI
    showAlert(message, className) {
        const div = document.createElement('div');
        // Dodajemo className
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // Dodavanje alerta
        container.insertBefore(div, form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    };
    // Kreiranje metode deleteBook
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    };
    // Kreiranje metode clearFields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
    // Metoda za zatvaranje modalnog prozora
    closeModal() {
        document.getElementById('editModal').style.display = 'none';
    }
    // Metoda za update knjige na UI
    updateBookOnUI(isbn, newTitle, newAuthor) {
        const rows = document.querySelectorAll('#book-list tr');
        rows.forEach(row => {
            if (row.cells[2].textContent === isbn) {
                row.cells[0].textContent = newTitle;
                row.cells[1].textContent = newAuthor; 
            }
        });
    }
};
// EventListener na formu 
document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Sprecavamo refresh
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // Kreiramo objekat book
    const book = new Book (title, author, isbn);
    console.log(book);

    if(title === '' || author === '' || isbn ==='') {
        ui.showAlert('Niste popunili sva polja', 'error');
    } else if (ui.isBookExists(isbn)) {
        ui.showAlert('Knjiga sa ovim ISBN-om vec postoji!', 'error');
    } else {
        ui.addBookToList(book);
        Storage.addBook(book) // Dodavanje knjige u storage
        ui.showAlert('Uspesno ste dodali knjigu!', 'success');
        ui.clearFields();
    }

})
// Listener za delete i izmenu knjiga
document.getElementById('book-list').addEventListener('click', e => {
    e.preventDefault();
    if (e.target.className === 'delete') {
        ui.deleteBook(e.target);
        Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);        
        ui.showAlert('Uspesno ste obrisali knjigu!', 'success')
    } else if (e.target.className === 'edit') {
        ui.editBook(e.target);
    }
    
});
// Local Storage
class Storage {
    static getBooks() {
        let books = localStorage.getItem('books');
        return books ? JSON.parse(books) : [];
    };

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    };

    static removeBook(isbn) {
        const books = Storage.getBooks();
        const filteredBooks = books.filter(book => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
    };

    static updateBook(isbn, newTitle, newAuthor) {
        let books = Storage.getBooks();
        const index = books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            books[index].title = newTitle;
            books[index].author = newAuthor;
            localStorage.setItem('books', JSON.stringify(books));
        }
    }
}
// Globalni UI(optimizacija)
const ui = new UI();

// eListener za zatvaranje modalnog prozora
document.querySelector('.close').addEventListener('click', () => {
    ui.closeModal();
});

// eListener za storage
document.addEventListener('DOMContentLoaded', () => {
    const books = Storage.getBooks();
    books.forEach(book => ui.addBookToList(new Book(book.title, book.author, book.isbn)));
});
// eListener na formu za izmenu knjige
document.getElementById('edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const isbn = document.getElementById('edit-isbn').value;
    const newTitle = document.getElementById('edit-title').value;
    const newAuthor = document.getElementById('edit-author').value;

// Pozivanje metoda za azuriranje knjiga u skladistu i na UI
    Storage.updateBook(isbn, newTitle, newAuthor);
    ui.updateBookOnUI(isbn, newTitle, newAuthor);
// Sakrivanje modalnog i prikaz poruke
    document.getElementById('editModal').style.display = 'none';
    ui.showAlert('Knjiga je azurirana', 'success');
});


/*  
    - Poboljšanje korisničkog interfejsa:
        Trimovanje malih i velikih slova
        Poboljšajte stilizaciju alert divova; na primer, da poruka bude bliža korisniku kada se pojavi, može se dodati tranzicija ili animacija.  */