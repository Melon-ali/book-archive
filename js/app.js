const searceInput = document.getElementById('search-input');
const displayShow = document.getElementById('displaying-books');
const loadingSpinner = document.getElementById('loading-spinner');
loadingSpinner.style.display = 'none';
const countOfResult = document.getElementById('found-counting');
const messageErrorOne = document.getElementById('one-error');
const messageErrorTwo = document.getElementById('two-error');

/****** Searce Books ******/

const searceBook = () => {
    const searceText = searceInput.value;
    searceInput.value = '';

    if (searceText === '') {
        /***** Error Handle One *****/
        messageErrorOne.style.display = 'block';
        /***** Clear Display *****/
        displayShow.innerText = '';
        countOfResult.style.display = 'none';
        messageErrorTwo.style.display = 'none';

    }
    else {
        /****** loading spinner *****/
        loadingSpinner.style.display = 'block';
        /***** Clear Display *****/
        displayShow.innerText = '';
        countOfResult.style.display = 'none';
        messageErrorOne.style.display = 'none';
        messageErrorTwo.style.display = 'none';

        /***** Fetch data *****/
        fetch(`https://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }

}

const displayBooks = (books) => {
    /******Result Showing *****/
    countOfResult.style.display = 'none';
    countOfResult.innerHTML = `
    <h2 class="text-center text-info fw-bold text"> Showing <span class=" text-count">${books.docs.length}</span> results out of <span class=" text-count"> ${books.numFound}</span> </h2> 
    `
    /****** Error Two ******/
    if (books.docs.length === 0) {
        messageErrorTwo.style.display = 'block';
    } else if (books.docs.length > 0) {
        countOfResult.style.display = 'block';
        messageErrorTwo.style.display = 'none';
    }

    /****** Spinner*******/

    loadingSpinner.style.display = 'none';

    displayShow.innerText = '';
    const allBooks = books.docs;
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img height="400px" src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-5">
            <div class="card-body">
                <h5 class="card-title">Name: ${book.title ? book.title : 'N/a'}</h5>
                 <h5>Author: ${book.author_name ? book.author_name[0] : 'N/a'}</h5>
                <h5>Publisher: ${book.publisher ? book.publisher[0] : 'N/a'}</h5>
                <h5>First publish: ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
            </div>
        </div>
        `;
        displayShow.appendChild(div);
    });
}