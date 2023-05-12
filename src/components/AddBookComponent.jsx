import { useEffect, useState } from "react";
import banana from "../media/banana.png";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Textfield from '@mui/material/TextField';
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem'
import Popup from 'reactjs-popup';
import { v4 } from "uuid";
import axios from "axios"
import Book from "./Book";

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

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
zIndex: "10",
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
    zIndex: "1",
    backgroundColor: "white",
    borderRadius: "3px",
    border: "1px solid lightGrey ",
    },
},
}));


const theme = createTheme({
    palette: {
      bananaBlueSwitch: {
        main: "#24A08B",
      }
    }
  });


function submit(book) {
    axios.post("http://localhost:5000/XD", {
        ISBN:book.ISBN,
        key:sessionUserKey
    }).then((response) => {
        
    });
}

function searchBooks(filter)//to zamienic na funkcje z api
{
    let book1={title:"test1",author:"author1",src:"src1",ISBN:1}
    let book2={title:"test2",author:"author2",src:"src2",ISBN:2}
    let book3={title:"test3",author:"author3",src:"src3",ISBN:3}
    let tmpBooks = [book1,book2,book3]
    return tmpBooks
}

function AddBookComponent(props)
{
const [filter, setFilter] = useState("")
const [condition, setCondition] = useState("good")
const [isOffered, setIsOffered] = useState(props.offered)
const [foundBooks, setFoundBooks] = useState([])
const [book, setBook] = useState({title:"", author:"", src:"", description:"", googleId:""})
const [hasSearched, setHasSearched] = useState(false)
const [rooms, setRooms] = useState([])
const [shelfs, setShelfs] = useState([])
const [selectedRoom, setSelectedRoom] = useState(0)
const [selectedShelf, setSelectedShelf] = useState(0)
const [bookSrc, setBookSrc] = useState(banana)
const [displayAddShelf, setDisplayAddShelf] = useState(false)
const [displayAddRoom, setDisplayAddRoom] = useState(false)
const [newRoomName, setNewRoomName] = useState("")
const [newshelfName, setNewShelfName] = useState("")
const [selectedRoomForShelf, setSelectedRoomForShelf] = useState(0)

useEffect(()=>{
    axios.get("http://localhost:5000/api/user_info/" + sessionUserKey).then((response) => {
            if(response.data.user.error!=="No such user")
            {
                setRooms(response.data.rooms)
                setShelfs(response.data.shelfs)
            }else
            {
                let roomsTmp=[{name:"rum1",id:1},{name:"room2",id:2}]
                let shelfsTmp=[{name:"szelf1",id:1},{name:"pułkanabułka",id:2}]
                setRooms(roomsTmp)
                setShelfs(shelfsTmp)
            }
        })
},[])

useEffect(()=>{
},[selectedRoom,selectedShelf])

var runFetch = async (filter) => {

    const rawResponse = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+filter+"&maxResults=5")
    setFoundBooks(rawResponse.data.items)
    setHasSearched(true)

} 

    return(
        <>
            <div className="container-fluid d-flex col-6 bg-banana-blue bg-opacity-25 border border-1 border-dark rounded-2 mt-3 p-5 pb-4 justify-content-center">
                <div className="col-10 d-flex flex-column align-items-center">
                    <div className="row">
                        {props.type==="personal" &&
                            <p className="fs-2 fw-semibold">Add to personal library</p>
                        }
                        {props.type==="wanted" &&
                            <p className="fs-2 fw-semibold">Add to wanted books:</p>
                        }
                        <div className="d-flex justify-content-center">
                        <Search>
                            <SearchIconWrapper>
                                <img src={banana} height="30px"/>
                            </SearchIconWrapper>
                            <StyledInputBase 
                            placeholder="Find title" 
                            inputProps={{ 'onChange':(e)=>{
                                setFilter(e.target.value)
                            } }}/>
                        </Search>
                        
                        <button className="btn btn-banana-primary" onClick={()=>{
                                runFetch(filter)
                            }}>Search</button>
                            
                        <Popup id="popup" open={hasSearched} position="bottom" onClose={()=>setHasSearched(false)}>
                            <div onClick={(e)=>{
                                let value = e.target.getAttribute('value')
                                let bookTmp = foundBooks.find(element => element.volumeInfo.industryIdentifiers[0].identifier === value);
                                setBookSrc(bookTmp.volumeInfo.imageLinks? bookTmp.volumeInfo.imageLinks.smallThumbnail : "notfound.png")
                                setBook({title: bookTmp.volumeInfo.title, author: bookTmp.volumeInfo.authors[0], src: bookTmp.volumeInfo.imageLinks? bookTmp.volumeInfo.imageLinks.smallThumbnail : "notfound.png", description: bookTmp.volumeInfo.description, googleId:bookTmp.id})
                                setHasSearched(false)
                                }}>
                                {foundBooks.map((b)=>
                                    <Book variant="list" key={v4()} {...b.volumeInfo}></Book>
                                )}
                            </div>
                        </Popup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <img src={bookSrc} style={{width: "100%",height:"100%", objectFit: "cover"}} />
                        </div>

                        <div className="col-7 ms-2 mt-5 row">
                            <label className="d-block">Author</label>
                            <Textfield 
                                size="small"
                                disabled
                                className="col-10"
                                value={book.author}/>
                            <label className="d-block mt-2">Title</label>
                            <Textfield 
                                size="small"
                                disabled
                                className="col-10"
                                value={book.title}/>

                            <label className="d-block mt-2">Room</label>
                            <FormControl className="col-8" size="small">
                                <Select
                                    displayEmpty
                                    required
                                    id="roomSelect"
                                    value={selectedRoom}
                                    size="small"
                                    onChange={(e)=>{
                                        setSelectedRoom(e.target.value)
                                    }} >
                                    {
                                        Array.from(rooms).map((r)=><MenuItem key={v4()} value={r.id}>{r.name}</MenuItem>)
                                    }                                    
                                </Select>
                            </FormControl>
                            <Popup id="popupRoom" open={displayAddRoom} position="bottom" onClose={()=>setDisplayAddRoom(false)}>
                                <div>
                                    <h2>Room Name</h2>
                                    <Textfield 
                                        required
                                        label="Name"
                                        onChange={(e)=>{
                                            setNewRoomName(e.target.value)
                                        }}
                                    />
                                    <button onClick={()=>{
                                        let roomsTmp = rooms
                                        axios.post("http://localhost:5000/api/room/add", {
                                            user_key:sessionUserKey,
                                            room_name:newRoomName,
                                        }).then((response) => {
                                            console.log(response)
                                            if(response.msg!=="error")
                                            {
                                                roomsTmp.push({name:newRoomName, id:response.id})
                                                setRooms(roomsTmp)
                                            }
                                            setDisplayAddRoom(false)
                                            setNewRoomName("")
                                        })
                                    }
                                    }>Add Room</button>
                                </div>
                            </Popup>
                            <div className="col-4 pe-0">
                                <button className="col-12 btn btn-banana-primary h-100" onClick={()=>setDisplayAddRoom(true)}>Add New</button>
                            </div>

                            <label className="d-block mt-2">Shelf</label>                    
                            <FormControl className="col-8" size="small">
                            <Select
                                    displayEmpty
                                    required
                                    id="shelfSelect"
                                    value={selectedShelf}
                                    size="small"
                                    onChange={(e)=>{
                                        setSelectedShelf(e.target.value)
                                    }} >
                                    {
                                        Array.from(shelfs).map((s)=><MenuItem key={v4()} value={s.id}>{s.name}</MenuItem>)
                                    }                                    
                                </Select>
                            </FormControl>
                            <Popup id="popupShelf" open={displayAddShelf} position="bottom" onClose={(e)=>{
                                    console.log(e.taget)
                                    if(e.target!==undefined)
                                    {
                                        setDisplayAddShelf(false)
                                    }
                                }}>
                                <h2>Room Name</h2>
                                <FormControl className="col-8" size="small">
                                    <Select
                                        displayEmpty
                                        required
                                        id="roomSelectForShelf"
                                        value={selectedRoomForShelf}
                                        size="small"
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setSelectedRoomForShelf(e.target.value)
                                            setDisplayAddShelf(displayAddShelf)
                                        }} >
                                        {
                                            Array.from(rooms).map((r)=><MenuItem key={v4()} value={r.id}>{r.name}</MenuItem>)
                                        }                                    
                                    </Select>
                                </FormControl>
                                <h2>Shelf Name</h2>
                                    <Textfield 
                                        required
                                        label="Name"
                                        onChange={(e)=>{
                                            setNewRoomName(e.target.value)
                                        }}
                                    />
                                <button onClick={()=>{
                                        let shelfsTmp = shelfs
                                        axios.post("http://localhost:5000/api/shelf/add", {
                                            user_key:sessionUserKey,
                                            name:newshelfName,
                                        }).then((response) => {
                                            console.log(response)
                                            if(response.data.msg.error!=="error")
                                            {
                                                shelfsTmp.push({name:newshelfName, id:response.id})
                                                setRooms(shelfsTmp)
                                            }
                                            setDisplayAddShelf(false)
                                            newshelfName("")
                                        })
                                    }
                                    }>Add shelf</button>
                            </Popup>
                            <div className="col-4 pe-0">
                                    <button className="col-12 btn btn-banana-primary h-100" onClick={()=>setDisplayAddShelf(true)}>Add New</button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-12 d-flex justify-content-center">
                        <label>Description</label>
                        <Textfield 
                            disabled
                            value={book.description}
                            multiline
                            rows={5}
                            />
                    </div>
                    {props.type==="personal" &&
                        <div className="row col-10 align-items-end ">
                            <div className="col">
                                <label>Condition</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={condition}
                                        size="small"
                                        onChange={(e)=>{
                                        setCondition(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"good"}>Good</MenuItem>
                                        <MenuItem value={"bad"}>Bad</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col d-flex">
                                <ThemeProvider theme={theme}>
                                    <Switch  color="bananaBlueSwitch" checked={isOffered? true:false} value={isOffered} onChange={()=>setIsOffered(!isOffered)}/>
                                </ThemeProvider>
                                <label className="fs-5">Available for renting</label>
                            </div>
                        </div>
                    }
                    
                    <div className="row col-12 d-flex justify-content-center mt-4">
                        {props.type==="personal" &&
                            <button className="col-3 btn btn-banana-primary" onClick={()=>window.location.href="/PersonalLibrary"}>Cancel</button>
                        }
                        {props.type==="wanted" &&
                            <button className="col-3 btn btn-banana-primary" onClick={()=>window.location.href="/WantedLibrary"}>Cancel</button>
                        }
                        <button className="col-3 ms-2 btn btn-banana-primary" onClick={()=>{
                            if(props.type==="personal")
                            {
                                axios.post("http://localhost:5000/api/owned_book/add", {
                                    key:sessionUserKey,
                                    book:book,
                                    shelf_id:selectedShelf,
                                    room:selectedRoom,
                                    rentable:isOffered,
                                    book_state:condition
                                })
                                props.setAddPersonalBook(false)
                            }else if(props.type==="wanted")
                            {
                                axios.post("http://localhost:5000/api/wanted_book/add", {
                                    key:sessionUserKey,
                                    book:book,
                                    shelf_id:selectedShelf,
                                    room:selectedRoom,
                                    rentable:isOffered,
                                    book_state:condition
                                })
                                console.log(props)
                                props.setAddWantedBook(false)
                            }
                        }}>Add Book</button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default AddBookComponent;