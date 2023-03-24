import React, { useEffect, useState } from "react";
import Book from './../components/Book'
import axios from 'axios'
import { v4 } from 'uuid';

function BookInfo() {

  const [books, setBooks] = useState(new Array())

  useEffect(() => {

    axios.get("http://localhost:5000/api/book_info").then((response) => {
      setBooks(response.data.books)
    });

  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      {books.map((book)=>
        <Book key={v4()} {...book}/>
      )}
    </div>
  );
}

export default BookInfo;
