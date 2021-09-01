const loadBookData = () => {
  const searchText = document.getElementById("input-field").value;
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBookData(data));
};
document.getElementById("search-btn").addEventListener("click", loadBookData);
const displayBookData = (data) => {
  const books = data.docs;
  books.forEach((book) => {
    console.log(book);
    const bookContainer = document.getElementById("book-container");
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-header">${book.title}</div>
            <div class="card-body">
                <h5 class="card-title">${[...book.author_name]}</h5>
                <p class="card-text">${book.publish_date[0]}</p>
                <p class="card-text">${[...book.publisher]}</p>
            </div>
        </div>
    `;
    bookContainer.appendChild(div);
  });
};
