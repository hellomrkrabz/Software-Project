import { Link } from "react-router-dom";
import Book from "./Book";
//import fetchBooks from "./BookViewer";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import fetchBooksById from "../scripts/fetchBooksById";
import loading from "../media/loading.gif"


function ProfileBookList(props) {
    

    //const emptyBook = {title:"", authors:[""], link:"", imageLinks:{smallThumbnail:""}}

    var emptyBook = {title:"xd1", authors:["xd2"], imageLinks:{smallThumbnail: loading}}

    const [bookIds, setBookIds] = useState(["_ojXNuzgHRcC","SDepCQAAQBAJ","xOFLAAAAcAAJ","c3tZAAAAMAAJ","Z7GfEAAAQBAJ","zYx2PQAACAAJ",])
    var booksXD=[];
    const [books, setBooks] = useState([emptyBook,emptyBook,emptyBook,emptyBook,emptyBook,emptyBook])

    useEffect(() => {
        fetchBooksById(bookIds[0]).then((r)=>{
            booksXD.push(r.volumeInfo)
            fetchBooksById(bookIds[1]).then((r)=>{
                booksXD.push(r.volumeInfo)
                fetchBooksById(bookIds[2]).then((r)=>{
                    booksXD.push(r.volumeInfo)
                    fetchBooksById(bookIds[3]).then((r)=>{
                        booksXD.push(r.volumeInfo)
                        fetchBooksById(bookIds[4]).then((r)=>{
                            booksXD.push(r.volumeInfo)
                            fetchBooksById(bookIds[5]).then((r)=>{
                                booksXD.push(r.volumeInfo)
                                setBooks(booksXD);
    })})})})})})},[]);

    return (
    <>
        <div className="row">
            <p>{props.title}</p>
            <div className="d-flex justify-content-around col-9 col-xl-10">
                <div className="row row-cols-sm-2 row-cols-xxl-6 row-cols-xl-3 gy-2 gx-2 row-cols-1 col-12">
                    
                    {/* <Book variant="small" {...books[0]}></Book> */}
                    
                    {/* <Book variant="small" {...books[1]}></Book>
                    <Book variant="small" {...books[2]}></Book>
                    <Book variant="small" {...books[3]}></Book>
                    <Book variant="small" {...books[4]}></Book>
                    <Book variant="small" {...books[5]}></Book> */}

                    {books.map((b)=><Book variant="small" key={v4()} {...b}/>)}
                </div>
            </div>

            <div className="align-self-center col-3 col-xl-2">
                    {props.isLoggedIn &&
                        props.addLink !== undefined &&
                            <Link to={props.addLink}>
                                <button className="btn btn-banana-primary col-12">Add new</button>
                            </Link>
                    }
                    <Link to={props.moreLink}>
                        <button className="btn btn-banana-primary col-12 mt-2">See more 1</button>
                    </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileBookList;
