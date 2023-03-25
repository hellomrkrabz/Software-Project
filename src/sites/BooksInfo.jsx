import React, { useEffect, useState } from "react";
import Book from './../components/Book'
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'

function BookInfo() {

  const [books, setBooks] = useState(new Array())

  useEffect(() => {

    axios.get("http://localhost:5000/api/book_info").then((response) => {
      setBooks(response.data.books)
    });

  }, []);

  return (
    <>
      <div>
          <Navbar site={"/"}/>
        </div>

      <div className="d-flex flex-column align-items-center">
        {books.map((book)=>
          <Book key={v4()} {...book}/>
        )}
      </div>
    </>
  );
}

export default BookInfo;
