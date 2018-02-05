document.addEventListener("DOMContentLoaded", () => {
    processResponse(fetch("api/books"));
    let indexPage = 0;

    document.getElementById("author").addEventListener("click", () => {
        processResponse(fetch("api/books?sortby=author"))

    });

    document.getElementById("title").addEventListener("click", () => {
        processResponse(fetch("api/books?sortby=title"))
    });
    document.getElementById("left").addEventListener("click", () => {
        indexPage--;
        if (indexPage < 0) indexPage = 0;
        processResponse(fetch("api/books?page=" + indexPage));

    });
    document.getElementById("right").addEventListener("click", () => {
        indexPage++;
        if (indexPage > 12) indexPage = 12;
        processResponse(fetch("api/books?page=" + indexPage));

    });
    document.getElementById("addBook").addEventListener("click", (e) => {
        e.preventDefault();
        let newAuthor = document.getElementById("newAuthor").value;
        let newTitle = document.getElementById("newTitle").value;

    });
});

function processResponse(response) {
    let table = document.getElementById("books");
    let total = document.getElementById("total");

    response.then(data => data.json())
        .then(value => {
            table.innerHTML = "";
            const tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML = "Author";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Book Title";
            tr.appendChild(th);
            table.appendChild(tr);
            for (let index = 0; index < value.books.length; index++) {
                const book = value.books[index];
                const tr = document.createElement("tr");
                let td = document.createElement("td");
                td.innerHTML = book.author;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = book.title;
                tr.appendChild(td);
                table.appendChild(tr);
            }
            total.innerHTML = value.total;
        });
}