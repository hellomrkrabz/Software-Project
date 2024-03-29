import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import BookGrid from "../components/BookGrid";
import banana from "../media/banana.png";
import AddBookComponent from "../components/AddBookComponent";
import loading from "../media/loading.gif"
import { GoogleBooksAPI } from "google-books-js";
import findCookie from "../scripts/findCookie";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

function Library(props) {

    const [addPersonalBook, setAddPersonalBook] = useState((props.mode==="add"|| props.mode==="addoffered") && props.type==="personal" ? true : false)
    const [addWantedBook, setAddWantedBook] = useState(props.mode==="add" && props.type==="wanted" ? true : false)
    const [offered, setOffered] = useState(props.mode==="offered" && props.type==="personal" ? true : false)
    const [isOffered, setIsOffered] = useState(props.mode==="addoffered" && props.type==="personal" ? true : false)
    const [filter, setFilter] = useState({title:"", author:"", language:"", publisher:"", ISBN:""})

    const [bookIds, setBookIds] = useState([])
    var emptyBook = {title:"title", authors:["author"], imageLinks:{smallThumbnail: loading}}
    const [books, setBooks] = useState([])
    
    const [filteredBooks, setFilteredBooks] = useState([])
    const [booksToDisplay, setBooksTodisplay] = useState([])
    const [pageNumber, setPageNumber] = useState(0)

    var sessionUsername= findCookie("sessionUserUsername")

    useEffect(() => {
        if(props.type==="personal")
        {
            axios.get("http://localhost:5000/api/owned_book_user/"+sessionUsername).then((response) => {
                
                setBookIds(response.data.books)
            })
        }else if(props.type==="wanted")
        {
            axios.get("http://localhost:5000/api/wanted_book_user/"+sessionUsername).then((response) => {

                setBookIds(response.data.books)
            })
        }
    }, []);

    useEffect(()=>{
        if(bookIds!==undefined && bookIds.length > 0)
        {
            var fetchedBooks = []
            for(let i = 0; i < bookIds.length; i++){

                axios.get("http://localhost:5000/api/book_info/" + bookIds[i].book_id).then((response)=>{
                    fetchedBooks.push(response.data)
                }).then(()=>{
                    if(i === bookIds.length - 1)
                {
                    setTimeout(function() {
                        let fbTMP = []

                        for(let i = 0; i < bookIds.length; i++)
                        {
                            let tmp= {
                                author: fetchedBooks[i].author,
                                book_id: fetchedBooks[i].book_id,
                                cover_photo: fetchedBooks[i].cover_photo,
                                google_book_id: fetchedBooks[i].google_book_id,
                                isbn: fetchedBooks[i].isbn,
                                title: fetchedBooks[i].title,
                                rentable: bookIds[i].rentable
                            }
                            fbTMP.push(tmp)
                        }
                        setBooks(fbTMP)
                        filterBooks(fbTMP, filter)
                    }, 1000);
                    }
                })
            }

        }
    },[bookIds])

    useEffect(() => {
        let noe=24;
        let offset=pageNumber*noe;
        setBooksTodisplay(filteredBooks.slice(offset,offset+noe))
    }, [filteredBooks,pageNumber]);

    function filterBooks(boo, f)
    {
        const titleFilter = new RegExp(f.title, 'i');
        const authorFilter = new RegExp(f.author, 'i');
        const languageFilter = new RegExp(f.language, 'i');
        const publisherFilter = new RegExp(f.publisher, 'i');
        const ISBNFilter = new RegExp(f.ISBN, 'i');
        const offeredFilter = new RegExp(offered, 'i');

        if(offered)
        {
            console.log(boo)
            var result = boo
            .filter(b => titleFilter.exec(b.title ?? ""))
            .filter(b => authorFilter.exec(b.author ?? ""))
            //.filter(b => languageFilter.exec(b.language ?? ""))
            //.filter(b => publisherFilter.exec(b.publisher ?? ""))
            .filter(b => ISBNFilter.exec(b.isbn ?? ""))
            .filter(b => offeredFilter.exec(b.rentable ?? ""))
        }else{
            var result = boo
            .filter(b => titleFilter.exec(b.title ?? ""))
            .filter(b => authorFilter.exec(b.author ?? ""))
            //.filter(b => languageFilter.exec(b.language ?? ""))
            //.filter(b => publisherFilter.exec(b.publisher ?? ""))
            .filter(b => ISBNFilter.exec(b.ISBN ?? ""))
        }
        setFilteredBooks(result)
        setPageNumber(0)
    }

    return (
        <>
            <Navbar site={props.site} username={props.username}></Navbar>
            
            <div className="container-fluid d-flex flex-column flex-grow-1">
                {props.type==="personal" && addPersonalBook &&//personal
                    <AddBookComponent type="personal" offered={isOffered} setAddPersonalBook={setAddPersonalBook} books={books} setBooks={setBooks} filterBooks={filterBooks} filter={filter}/>
                }
                {props.type==="personal" && !addPersonalBook &&
                    <div className="row flex-grow-1">
                        <div className="col-xl-9 col-12 order-2 order-xl-1 bg-light">
                            <p className="fs-5 fw-semibold">Personal Library</p>
                            <div className="row">                                
                                <BookGrid books={booksToDisplay}></BookGrid>
                            </div>
                        </div>
                        <div className="col-12 col-xl-3 order-1 bg-banana-blue bg-opacity-25 d-flex flex-column">
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                placeholder="Find title" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"title":e.target.value})
                                } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                    placeholder="Author" 
                                    inputProps={{ 'onChange':(e)=>{
                                        setFilter({...filter,"author":e.target.value})
                                    } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase  
                                    placeholder="Language" 
                                    inputProps={{ 'onChange':(e)=>{
                                        setFilter({...filter,"language":e.target.value})
                                    } }}/>
                            </Search>
                            <Search className="mt-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase 
                                placeholder="Publisher" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"publisher":e.target.value})
                                } }}/>
                            </Search>
                            <Search className="mt-4 mb-4">
                                <SearchIconWrapper>
                                    <img src={banana} height="30px"/>
                                </SearchIconWrapper>
                                <StyledInputBase  
                                placeholder="ISBN" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"ISBN":e.target.value})
                                } }}/>
                            </Search>
                        
                            <div className="p-2 justify-content-between d-flex flex-column flex-grow-1">
                                <button className="col-12 btn btn-banana-primary-dark" onClick={()=>{ filterBooks(books,filter)  }}>Search</button>
                                <div className="align-self-stretch mt-4">
                                    <button className="col-12 btn btn-banana-primary-dark mb-3" onClick={()=>{ setAddPersonalBook(true) }}>Add Book</button>
                                    <button className="btn btn-banana-primary-dark col-5" onClick={()=>{
                                        if(pageNumber>0)
                                        {
                                            setPageNumber(pageNumber-1)
                                        }
                                    }}>Prev</button>
                                    <button className="btn btn-banana-primary-dark col-5 offset-2" onClick={()=>{
                                        if(pageNumber < (filteredBooks.length/24) -1)
                                        {
                                            setPageNumber(pageNumber+1)
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {props.type==="wanted" && addWantedBook &&//wanted
                    <AddBookComponent type="wanted" offered={isOffered} setAddWantedBook={setAddWantedBook} books={books} setBooks={setBooks} filterBooks={filterBooks} filter={filter}/>
                }
                {props.type==="wanted" && !addWantedBook &&
                    <div className="row flex-grow-1">
                    <div className="col-xl-9 col-12 order-2 order-xl-1 bg-light">
                        <p className="fs-5 fw-semibold">Wanted Library</p>
                        <div className="row">                                
                            <BookGrid books={booksToDisplay}></BookGrid>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3 order-1 bg-banana-blue bg-opacity-25 d-flex flex-column">
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Find title" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"title":e.target.value})
                            } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                                placeholder="Author" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"author":e.target.value})
                                } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase  
                                placeholder="Language" 
                                inputProps={{ 'onChange':(e)=>{
                                    setFilter({...filter,"language":e.target.value})
                                } }}/>
                        </Search>
                        <Search className="mt-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Publisher" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"publisher":e.target.value})
                            } }}/>
                        </Search>
                        <Search className="mt-4 mb-4">
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase  
                            placeholder="ISBN" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter({...filter,"ISBN":e.target.value})
                            } }}/>
                        </Search>
                    
                        <div className="p-2 justify-content-between d-flex flex-column flex-grow-1">
                                <button className="col-12 btn btn-banana-primary-dark" onClick={()=>{ filterBooks(books,filter)  }}>Search</button>
                                <div className="align-self-stretch mt-4">
                                    <button className="col-12 btn btn-banana-primary-dark mb-3" onClick={()=>{ setAddWantedBook(true) }}>Add Book</button>
                                    <button className="btn btn-banana-primary-dark col-5" onClick={()=>{
                                        if(pageNumber>0)
                                        {
                                            setPageNumber(pageNumber-1)
                                        }
                                    }}>Prev</button>
                                    <button className="btn btn-banana-primary-dark col-5 offset-2" onClick={()=>{
                                        if(pageNumber < (filteredBooks.length/24) -1)
                                        {
                                            setPageNumber(pageNumber+1)
                                        }
                                    }}>Next</button>
                                </div>
                            </div>
                    </div>
                </div>
                }
            </div>
        </>
    );
}

export default Library;
