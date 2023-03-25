import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'
import BetterTextfield from "../components/BetterTextfield";
import banana from "./../media/banana.png"


function Profile() {

    const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [profilePicture, setProfilePicture] = useState(banana)

    useEffect(() => {

        axios.get("http://localhost:5000/api/user_info/"+userId).then((response) => {
            setEmail(response.email)
            setUserName(response.userName)
            setProfilePicture(response.avatar)
        });

    }, []);

    return (
        <>
            <div>
                <Navbar site={"/Profile"}/>
            </div>

            <div className="d-flex flex-column align-items-center">
                <img src={profilePicture} height="100px" width="100px"/>
                <div>
                    <BetterTextfield disabled required margin='normal' name="username" id="username" type={'text'} variant='outlined' placeholder='Username'/>
                </div>
                <div>
                    <BetterTextfield disabled required margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email'/>
                </div>
                <div>
                    <BetterTextfield disabled required margin='normal' name="email" id="email" type={'email'} variant='outlined' placeholder='Email' className=""/>
                </div>
                <div>
                    <button>Edit</button>
                </div>
            </div>
        </>
    );
}

export default Profile;
