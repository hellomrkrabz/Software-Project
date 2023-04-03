import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'
import banana from "./../media/banana.png"
import TextField from "@mui/material/TextField"
import MyProfile from "../components/MyProfile";
import OthersProfile from "../components/OthersProfile";
import EditProfile from "../components/EditProfile";


function Profile(props) {

    const [isEditing, setIsEditing] = useState(!true)
    var params = {name : "test name"}

    useEffect(() => {
        /*
        axios.get("http://localhost:5000/api/user_info/"+userId).then((response) => {
            setEmail(response.email)
            setUserName(response.userName)
            setProfilePicture(response.avatar)
        });*/

    }, []);


    return (
        <>
            <div>
                <Navbar site={"/Profile"} setIsEditing={setIsEditing} isEditing={isEditing}/>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-between">
                {
                    isEditing ? 
                        <>{/* edition */}
                            <EditProfile {...params}></EditProfile>
                        </>
                        :
                        <>{/* displying */}
                            <MyProfile {...params}></MyProfile>
                        </>
                }
            </div>
        </>
    );
}

export default Profile;
