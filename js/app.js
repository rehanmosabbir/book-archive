const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};

const loadBookData = () => {
  const searchText = document.getElementById("input-field").value;
  // display spinner
  toggleSpinner("block");
  document.getElementById("book-container").innerHTML = ``;
  document.getElementById("num-books").innerHTML = ``;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBookData(data))
    .catch((err) => console.log(err));
  document.getElementById("input-field").value = "";
};
document.getElementById("search-btn").addEventListener("click", loadBookData);
const displayBookData = (data) => {
  const books = data.docs;
  const numBooksContainer = document.getElementById("num-books");
  const h4 = document.createElement("h4");
  h4.classList.add("text-danger", "fw-bold", "my-4");
  h4.innerText = `${data.numFound === 0 ? `No result found!` : `Found: ${data.numFound} books`}`;
  numBooksContainer.appendChild(h4);
  books.forEach((book) => {
    console.log(book);
    const bookContainer = document.getElementById("book-container");
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
        <div class="card text-dark mb-5" style="max-width: 18rem; border: 1px solid #ddd; border-radius: 5px">
            <img src=${
              book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `images/cover_i_n-M.jpg`
            } class="img-thumbnail" style="width: 18rem; height: 18rem" alt="${book.title}">
            <div class="card-header">Book's Name : ${book.title}</div>
            <div class="card-body">
                <h5 class="card-title">Author's name : ${book?.author_name?.length > 0 ? book.author_name[0] : "N/A"}</h5>
                <p class="card-text">First Publish year : ${book?.first_publish_year}</p>
                <p class="card-text">Publisher : ${book?.publisher?.length > 0 ? book.publisher[0] : "N/A"}</p>
            </div>
        </div>
    `;
    bookContainer.appendChild(div);
  });
  // hide spinner
  toggleSpinner("none");
};
