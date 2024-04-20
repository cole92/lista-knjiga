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
            <td><a href="" class="delete">X</a></td>
        `;
        return row;
    }
    // Metoda za dodavanje knjige u listu
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = this.createBookRow(book);
        list.appendChild(row)
    }
    isBookExists(isbn) {
        const list = document.getElementById('book-list');
        const rows = list.querySelectorAll('tr');
        return Array.from(rows).some(row => row.cells[2].textContent === isbn);
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
        ui.showAlert('Niste popunili sva polja', 'error');
    } else if (ui.isBookExists(isbn)) {
        ui.showAlert('Knjiga sa ovim ISBN-om vec postoji!', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Uspesno ste dodali knjigu!', 'success');
        ui.clearFields();
    }

})
// Listener za delete
document.getElementById('book-list').addEventListener('click', e => {
    e.preventDefault();
    const ui = new UI();
    ui.showAlert('Uspesno ste obrisali knjigu!', 'error')
    ui.deleteBook(e.target)
})




// Neki local storage da sacuva knjige probahhh.

/*  
    - Poboljšanje korisničkog interfejsa:
        Razmislite o dodavanju funkcionalnosti za uređivanje postojećih unosa knjiga.
        Poboljšajte stilizaciju alert divova; na primer, da poruka bude bliža korisniku kada se pojavi, može se dodati tranzicija ili animacija.

    - Optimizacija:
    Iako se novi objekat UI kreira svaki put kada se forma submituje,
    možete razmisliti o kreiranju jednog objekta UI van event listenera i ponovnoj upotrebi, jer UI ne čuva stanje koje bi se promenilo između zahteva. */