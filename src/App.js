import React, { useEffect, useState } from "react";
import Book from './components/Book.jsx'

function App() {

  const [books, setBooks] = useState([{title:"Układy mikroprocesorowe. Przykłady rozwiązań",author:"Bartłomiej Zieliński"},{title:"Windows 3.1 PL",author:"Urszula Stańczyk"}])

  useEffect(() =>
	{
		(async () =>
		{
			const response = await fetch("http://localhost:5000/api/data")
			const responseJson = await response.json()
      setBooks(responseJson)

		})();
	}, []);

  const listOfBooks = books.map((book) =>
    <Book {...book}/>
  );

  return (
    <div>
      {listOfBooks}
    </div>
  );
}

export default App;
