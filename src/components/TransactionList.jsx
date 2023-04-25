import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"

function TransactionList(props) {
  //tymczasowe, trzeba bêdzie podjebaæ z bazy
  const [book, setBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" })
  const [books, setBooks] = useState([book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book, book])  
  return (
    <>
          {books.map((b) =>
              <Transaction user="debil" date="21.03.07" status="gites majonez" book={b}> </Transaction>
        )}
    </>
  );
}

export default TransactionList;
