import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'
import BetterTextfield from "../components/BetterTextfield";
import banana from "./../media/banana.png"
import TextField from "@mui/material/TextField"

function Profile() {

    const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("xd")
    const [userName, setUserName] = useState("xdd")
    const [profilePicture, setProfilePicture] = useState(banana)
    const [password, setPassword] = useState("")
    
    const [newEmail, setNewEmail] = useState("")
    const [newUserName, setNewUserName] = useState("")
    const [newProfilePicture, setNewProfilePicture] = useState(banana)
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    
    const [isEditing, setIsEditing] = useState(false)
    const [correct, setCorrect] = useState(false)

    useEffect(() => {

        axios.get("http://localhost:5000/api/user_info/"+userId).then((response) => {
            setEmail(response.email)
            setUserName(response.userName)
            setProfilePicture(response.avatar)
        });

    }, []);


    function submit() {
        if (newPassword === newPasswordConfirmation) {
            setCorrect(true);
            axios.post("http://localhost:5000/nwm/XD", {
                sentEmail: newEmail,
                sentPassword: password,
                sentNewPassword: newPassword,
                sentPicture: newProfilePicture,
                sentUserName: newUserName
            }).then((response) => { if (response = "OK") { console.log("we happy") } else { console.log("we not happy") } });
        }
        else {
            setCorrect(false);
        }
    }

    return (
        <>
            <div>
                <Navbar site={"/Profile"}/>
            </div>

            <div className="d-flex flex-column align-items-center">

                {isEditing ? 
                <>  {/* this is for editing */}
                    <img src={profilePicture} height="100px" width="100px"/>
                    <div>
                        <TextField margin='normal' name="username" id="username" type={'text'} 
                        variant='outlined' label='New Username' className="mt-1 mb-1" value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}/>
                    </div>
                    <div>
                        <TextField margin='normal' name="email" id="email" type={'email'}
                         variant='outlined' label='New Email' className="mt-1 mb-1" value={newEmail} 
                         onChange={(e) => setNewEmail(e.target.value)}/>
                    </div>
                    <div>
                        <TextField margin='normal' name="newPassword" id="newPassword" type={'password'}
                         variant='outlined' label='New Password' className="mt-1 mb-1" value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                    <div>
                        <TextField margin='normal' name="newPasswordConfirmation" id="newPasswordConfirmation" type={'password'}
                         variant='outlined' label='Confirm New Password' className="mt-1 mb-1" value={newPasswordConfirmation}
                         onChange={(e) => setNewPasswordConfirmation(e.target.value)}/>
                    </div>
                    <div>
                        <TextField margin='normal' name="oldPassword" id="oldPassword" type={'password'}
                         variant='outlined' label='Previous Password' className="mt-1 mb-1" value={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div>
                        <button onClick={()=>{
                            setIsEditing(false)
                            setNewEmail("")
                            setNewUserName("")
                            setNewProfilePicture("")
                        }}>Discard</button>
                    </div>
                    <div>
                        <button onClick={()=>{
                            submit()
                            }}>Save</button>
                    </div>
                </>
                :
                <>  {/* this is for displaying */}
                    <img src={profilePicture} height="100px" width="100px"/>
                    <div>
                        <TextField disabled  margin='normal' name="username" id="username" type={'text'}
                        variant='outlined' label='Username' value={userName}/>
                    </div>
                    <div>
                        <TextField disabled  margin='normal' name="email" id="email" type={'email'}
                        variant='outlined' label='Email' value={email}/>
                    </div>

                    <div>
                        <button onClick={()=>{
                            setIsEditing(true)
                            setNewEmail(email)
                            setNewUserName(userName)
                            setNewProfilePicture(profilePicture)
                            setNewPassword("")
                            setNewPasswordConfirmation("")
                            setPassword("")
                            }}>Edit</button>
                    </div>
                </>
                }

            </div>
        </>
    );
}

export default Profile;
