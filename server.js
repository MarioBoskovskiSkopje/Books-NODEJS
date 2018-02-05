const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: __dirname + "/public"
    });
});

const apiRouter = express.Router();

apiRouter.get("/books", (req, res) => {

    let sortOrder = req.query["sortby"];
    let pageIndex = req.query["page"];

    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error("ERROR is: ", err);
            return;
        }

        let books = JSON.parse(data);
        if (sortOrder === "author") {
            books.sort((a, b) => a.author.localeCompare(b.author));
        } else if (sortOrder === "title") {
            books.sort((a, b) => a.title.localeCompare(b.title));
        }

        let bookPages = pageIndex;
        if (bookPages === undefined) {
            bookPages = 0;
        }
        let splicedBooks = [];
        for (let i = 0; i < books.length / 50; i++) {
            splicedBooks.push(books.slice(i * 50, (i + 1) * 50));
        }
        res.send(JSON.stringify({
            books: splicedBooks[parseInt(bookPages)],
            total: books.length








        }));
    });
})

apiRouter.get("/books/title", (req, res) => {
    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error("ERROR is: ", err);
            return;
        }

        let books = JSON.parse(data);
        let titles = books.map(book => book.title);
        res.send(JSON.stringify(titles));
    });
})

apiRouter.get("/books/author", (req, res) => {
    fs.readFile("data/books.json", {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.error("ERROR is: ", err);
            return;
        }

        let books = JSON.parse(data);
        let authors = books.map(book => book.author);
        res.send(JSON.stringify(authors));
    });
})


app.use("/api", apiRouter);


app.listen(8080, () => console.log('Example app listening on port 8080!'));