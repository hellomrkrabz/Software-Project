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
        tmp.push(response.data.msg[0])
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
        <Book id={book[0]} author={book[1]} title={book[2]}/>
      )}
    </div>
  );
}

export default App;
