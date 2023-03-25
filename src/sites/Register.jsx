import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [correct, setCorrect] = useState(false);
    const [openPopup, setOpen] = useState(false);


    function submit() {
        console.log(password)
        console.log(passwordConfirmation)
        if (password === passwordConfirmation) {
            setCorrect(true);
            axios.post("http://localhost:5000/user_validation/register", {
                sentEmail: email,
                sentPassword: password
            }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
        }
        else {
            setCorrect(false);
        }
    }

    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>

            <div className="d-flex flex-column align-items-center">
                <form>
                    <div> <label htmlFor="email">Email:</label> </div>
                    <div> <TextField margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email' onChange={(e) => { setEmail(e.target.value) } } ></TextField></div>
                    <div> <label htmlFor="password">Password:</label> </div>
                    <div> <TextField margin='normal' name="password" id="password" type={'password'} variant='outlined' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} ></TextField></div>
                    <div> <label htmlFor="confirmPassword">Confirm password:</label> </div>
                    <div> <TextField margin='normal' name="confirmPassword" id="confirmPassword" type={'password'} variant='outlined' placeholder='Confirm password' onChange={(e) => { setPasswordConfirmation(e.target.value) }} ></TextField></div>
                </form>
                <div> <button onClick={() => { setOpen(!openPopup); submit() }} id="submit" name="submit">Submit</button> </div>
                <Popup open={openPopup} position="right center" closeOnDocumentClick onClose={() => { setOpen(false) } }>  <span> Password {correct ? 'correct' : 'incorrect'}, registration {correct ? 'successful' : 'failed'} </span></Popup>
            </div>
        </>
    );
}

export default Register;
