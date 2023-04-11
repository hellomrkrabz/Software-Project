import React, { useEffect, useState } from "react";
import Navbar from './../components/Navbar'
import MyProfile from "../components/MyProfile";
import OthersProfile from "../components/OthersProfile";
import EditProfile from "../components/EditProfile";

function getUserNameFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function Profile(props) {

    const user = {username:"Zenek", rating:3, bio:"Fajen te banenen",adress:"South Park", src:"https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/14/12/monkey-bananav3.jpg?width=1200"}

    const [isEditing, setIsEditing] = useState(!true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        /*
        axios.get("http://localhost:5000/api/user_info/"+userId).then((response) => {
            setEmail(response.email)
            setUserName(response.userName)
            setProfilePicture(response.avatar)
        });*/

        

        if(getUserNameFromLink()===user.username)
        {
            setIsLoggedIn(true)
        }

    }, []);


    return (
        <>
            <div>
                <Navbar site={"/Profile"} setIsEditing={setIsEditing} isEditing={isEditing}/>
            </div>

            <div className="d-flex flex-grow-1">
                {
                    isLoggedIn ?
                        isEditing ? 
                        <>{/* edition */}
                            <EditProfile {...user}></EditProfile>
                        </>
                        :
                        <>{/* displying */}
                            <MyProfile {...user}></MyProfile>
                        </>
                    :
                    <OthersProfile {...user}></OthersProfile>
                }
            </div>
        </>
    );
}

export default Profile;
