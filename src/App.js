import React, { useEffect, useState } from "react";
import Book from './components/Book.jsx'
import axios from 'axios'

function App() {

  const [books, setBooks] = useState(new Array())

  useEffect(() => {

    axios.get("http://localhost:5000/api/book_info").then((response) => {
      setBooks(response.data.books)
    });

  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      {books.map((book)=>
        <Book {...book}/>
      )}
    </div>
  );
}

export default App;
