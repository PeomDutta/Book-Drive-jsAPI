// getting user input through search bar and pass it to display details
const searchBooks = () => {

    // getting user input 
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    // clearing the input 
    searchInput.value = "";

    // if user input is not an empty string then fetch data from api
    if (searchText !== '') {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displaySearch(data));
    }
    // if user input is an empty string then throw a error 
    else {
        // clearing book card text -content whene user puts no input 
        document.getElementById("book-card").textContent = "";
        const found = document.getElementById("found");
        found.innerText = `❗❗ Please Enter a book name ❗❗`;
    }
}

// displaying searched details from api 
const displaySearch = booksData => {
    console.log(booksData);

    // get found id element 
    const foundNumber = document.getElementById("found");

    // get the div which display the serach results through bootstrap card  
    const bookCard = document.getElementById("book-card");
    bookCard.textContent = "";  // clearing div text content

    // set all the api docs array in books 
    const books = booksData.docs;

    // if search element is not in api, through an error
    if (books.length === 0) {
        foundNumber.innerText = `❌ No result found ❌`;
    }

    // if search element is in api, display it 
    else {
        foundNumber.innerText = `✔️ Number of books found: ${booksData.numFound}.`;

        // forEach loop to display each element and slicing the array to 30 elements.
        books.slice(0, 30).forEach(book => {

            // creating a div with class name 'col' for making bootstrap card 
            const divCol = document.createElement('div');
            divCol.classList.add('col');

            /* calling up the 
                1. book name
                2. author name
                3. publisher
                4. first publishing year dynamically */

            divCol.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><u>Book Name</u>: ${book.title}</h5>
                    <p class="card-text"><u>Author Name</u>: <b>${book.author_name}</b></p>
                    <p class="card-text"><u>Book Publisher</u>: <b>${book.publisher}</b></p>
                    <p class="card-text"><u>Publishing Year</u>: <b>${book.first_publish_year}</b></p>
                    
                </div>
            </div>
            `;
            // appending this whole new div with bookCard div as a child 
            bookCard.appendChild(divCol);
        })
    }

}