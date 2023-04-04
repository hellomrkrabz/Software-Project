import React, { useEffect, useState } from "react";
import Navbar from './../components/Navbar'
import OthersProfile from "../components/OthersProfile";

function getUserName()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function ForeignProfile(props) {

    const [isEditing, setIsEditing] = useState(!true)
    var props = {userName: getUserName()}

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
                <Navbar site={"/ForeignProfile"}/>
            </div>

            <div className="flex-grow-1 d-flex">
                <OthersProfile {...props}></OthersProfile>
            </div>
        </>
    );
}

export default ForeignProfile;
