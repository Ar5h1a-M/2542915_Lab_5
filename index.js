const express = require('express');

const indx = express ();
indx.use(express.json());

const PORT =  3000;

indx.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

  indx.get("/status", (request, response) => {
    const sts = {
       "Status": "Runnning"
    };
    
    response.send(sts);
 });

let books = [];


indx.get("/whoami", (request, response) => {
    response.json({studentNumber: 2542915});
 });

indx.get("/books", (request, response) => {
    response.json(books);
 });

indx.get("/books/:id", (request, response) => {
    const book = books.find(bk=>bk.id === parseInt(request.params.id));
    if(!book){
        return response.status(404).json({error: "no book found"});
        }
        response.json(book);
    
 });

indx.post("/books", (request, response) => {
    const id = request.body.id;
    const title = request.body.title;
    const details = request.body.details;
    

    if(!title || !Array.isArray(details) || !id){
        return response.status(400).json({error: "misssing required book details"});
    }
    const adBook= {id, title, details};

    /*details.forEach(detail =>{
        if(detail.id && detail.author && detail.genre && detail.pubDate){
            adBook.details.push({
                id: detail.id,
                author: detail.author,
                genre: detail.genre,
                publicationYear: detail.pubDate
            });
        }
    });*/

    books.push(adBook);
    response.status(201).json({ message: "posted", book: adBook });


 });

indx.put("/books/:id", (request, response) => {
    const book = books.find(bk=>bk.id === parseInt(request.params.id));
    if(!book){
        return response.status(404).json({error: "no book found"});
        }

    book.id = request.body.title || book.id;
    book.title = request.body.title || book.title;
    book.details = request.body.title || book.details;
    response.json(book);
 });

indx.delete("/books/:id", (request, response) => {
    const book = books.find(bk=>bk.id === parseInt(request.params.id));
    if(!book){
        return response.status(404).json({error: "no book found"});
        }

    books.splice(book, 1);

 });

indx.post("/books/:id/details", (request, response) => {
    const book = books.find(bk=>bk.id === parseInt(request.params.id));
    if(!book){
        return response.status(404).json({error: "no book found"});
        }
        const auth = request.body.author;
        const idd = request.body.id;
        const gnr = request.body.genre;
        const pubDate = request.body.publicationYear;

    if(!auth|| !idd || !gnr || ! pubDate){
        return response.status(400).json({error: "missing required book details"});

    }

    const newDeet = {
        idd, auth, gnr, pubDate
    };

    book.details.push(newDeet);

 });

indx.delete("/books/:id/details/:detailID", (request, response) => {
    const book = books.find(bk=>bk.id === parseInt(request.params.id));
    if(!book){
        return response.status(404).json({error: "no book found"});
        }

    const booKdeets = books.find(bk=>bk.id === parseInt(request.params.id));
        if(!booKdeets){
            return response.status(404).json({error: "no detail found"});
        }

    book.detail.splice(booKdeets, 1);
    
 });
