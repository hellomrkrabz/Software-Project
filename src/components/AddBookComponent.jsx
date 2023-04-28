import { useState } from "react";
import banana from "../media/banana.png";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Textfield from '@mui/material/TextField';
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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

function submit() {
    console.log(":D")
}


function AddBookComponent(props)
{
const [condition, setCondition] = useState("good")

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    {props.type==="personal" &&
                        <p>Add to personal library</p>
                    }
                    {props.type==="wanted" &&
                        <p>Add to wanted books</p>
                    }
                    <div className="d-flex justify-content-center bg-danger">
                    <Search>
                        <SearchIconWrapper>
                            <img src={banana} height="30px"/>
                        </SearchIconWrapper>
                        <StyledInputBase 
                        placeholder="Find title" 
                        inputProps={{ 'onChange':(e)=>{
                            setFilter({...filter,"title":e.target.value})
                        } }}/>
                    </Search>
                    <button>Search</button>
                    </div>
                </div>
                <div className="row">
                        <img className="col-6 bg-primary" src={banana} height="200px" width="200px" />
                    <div className="col-6 bg-light">
                        <label>Author</label>
                        <Textfield />
                        <label>Title</label>
                        <Textfield />
                    </div>
                </div>
                <div className="row d-flex justify-content-center bg-info">
                    <label>Description</label>
                    <Textfield 
                        multiline />
                </div>
                {props.type==="personal" &&
                    <div className="row">
                        <div className="col-6 bg-success">
                            <label>Condition</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={condition}
                                    onChange={(e)=>{console.log(e.target.value)
                                    setCondition(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"good"}>Good</MenuItem>
                                    <MenuItem value={"bad"}>Bad</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-6 bg-warning">
                            <Switch />
                        </div>
                    </div>
                }
                
                <div className="row d-flex justify-content-center">
                    <button className="col-3">Cancel</button>
                    <button className="col-3" onClick={()=>submit()}>Add Book</button>
                </div>
            </div>
            
        </>
    );
}

export default AddBookComponent;