


// book constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constructor

function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // create a table row element
    const row = document.createElement('tr');
    // insert calls
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">x</a></td>
    `;

    list.appendChild(row);


}

// show error alert

UI.prototype.showAlert = function(message, className){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className =  `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // timeout 
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// clear fields

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



// event listener - add

document.getElementById('book-form').addEventListener('submit', function(e) {
    
    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;


    // instantiating new book      
    const book = new Book(title, author, isbn);

    // instantiating UI
    const ui = new UI();

    // validate input
    if(title === '' || author === '' || isbn === ''){
        // error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book added!', 'success');

        // clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

// event listener - delete

document.getElementById('book-list').addEventListener('click', function(e) {

     // instantiating UI
     const ui = new UI();

     // delete book
     ui.deleteBook(e.target);

     // show delete message
     ui.showAlert('Book removal successful', 'success');

    e.preventDefault();
})







