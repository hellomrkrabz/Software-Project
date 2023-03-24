import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submit() {
        axios.post("http://localhost:5000/user_validation/register", {
            sentEmail: email,
            sentPassword: password
        }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <form>
                <div> <label htmlFor="email">Email:</label> </div>
                <div> <TextField margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email' onChange={(e) => { setEmail(e.target.value) } } ></TextField></div>
                <div> <label htmlFor="password">Password:</label> </div>
                <div> <TextField margin='normal' name="password" id="password" type={'password'} variant='outlined' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} ></TextField></div>
            </form>
            <div> <button id="submit" name="submit" onClick={() => { submit() } }>Submit</button></div>
        </div>
    );
}

export default Register;
