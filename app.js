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
    // kreiranje metode addBookTolist klase UI
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    // kreiranje metode showAlert klase UI
    showAlert(message, className) {
        const div = document.createElement('div');
        // dodajemo className
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // dodavanje alerta
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
    // kreiranje metode clearFields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
};
// eventListener na formu
document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Sprecavamo refresh
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // Kreiramo objekat book
    const book = new Book (title, author, isbn);
    console.log(book);

    const ui = new UI();

    if(title === '' || author === '' || isbn ==='') {
        ui.showAlert('Niste popunili sva polja', 'error')
    } else {
        ui.addBookToList(book);
        ui.showAlert('Uspesno ste dodali knjigu!', 'success')
    }

})




// Probamo da sredimo da ne moze dve iste knjige.
// Da sredimo X
// Neki local storage.