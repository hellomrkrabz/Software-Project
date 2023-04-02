import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/Navbar";



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("xd");


    async function submit() {
        axios.post("http://localhost:5000/user_validation/register", {
            sentEmail: email,
            sentPassword: password,
            confirmPassword: confirmPassword
        }).then(async (response) => {
            console.log(response.data.msg);
            setPopupMessage(response.data.msg);
            /*if (response.data.msg === "WORKING") {
                console.log("alleluja chwalmy pana");
                setPopupMessage("alleluja chwalmy pana");
            } else if (response.data.msg === "No password provided") {
                console.log("no password");
                setPopupMessage("no password set");
            } else if (response.data.msg === "Passwords don\'t match") {
                console.log("Passwords don\'t match");
                setPopupMessage("Passwords don\'t match");
            } else if (reponse.data.msg === "E-mail is already taken") {
                console.log("email taken");
                setPopupMessage("email taken");
            } else if (response.data.msg === "No email provided") {
                console.log("no mail");
                setPopupMessage("no mail");
            } else {
                console.log("o chuj");
                setPopupMessage("o chuj");
            }
            */
        });
            
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
                    <div> <TextField margin='normal' name="confirmPassword" id="confirmPassword" type={'password'} variant='outlined' placeholder='Confirm password' onChange={(e) => { setConfirmPassword(e.target.value) }} ></TextField></div>
                </form>
                <div> <button onClick={() => { setOpenPopup(!openPopup); submit() }} id="submit" name="submit">Submit</button> </div>
                <Popup open={openPopup} position="right center" closeOnDocumentClick onClose={() => { setOpenPopup(false) } }>  <span> { popupMessage } </span></Popup>
            </div>
        </>
    );
}

export default Register;
