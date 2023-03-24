import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"
import axios from 'axios'

function Login() {

    //hooks here

    function submit() {
        axios.post("http://localhost:5000/user_validation/register", {
            //data here
        }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
    }

    return (
        <>BANANA</>
    );
}

export default Login;
