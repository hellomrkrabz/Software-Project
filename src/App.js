import React, { useEffect, useState } from "react";
import Book from './components/Book.jsx'
import axios from 'axios'

function App() {

  const [books, setBooks] = useState(new Array())

  useEffect(() => {
    var tmp=new Array()
    for(var i=0;i<4;i++)
    {
      axios.get("http://localhost:5000/api/bookinfo/"+i).then((response) => {
        tmp.push(response.data)
      });
    }
    setBooks(tmp)
  }, []);

  setTimeout(() => {
    setBooks(books)
    if(books.length==0)
      setBooks(books)
  }, 2500);

  return (
    <div className="d-flex flex-column align-items-center">
      {books.map((book)=>
        <Book id={book.book_id} author={book.author} title={book.title}/>
      )}
    </div>
  );
}

export default App;
