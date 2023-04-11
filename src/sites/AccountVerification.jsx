import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 } from 'uuid';
import Navbar from './../components/Navbar'

function AccountVerification() {

    const [verification, setVerification] = useState(false)

    useEffect(() => {
        const pathParts = window.location.pathname.split('/')
        axios.post("http://localhost:5000/user_validation/account_verification", {
            sentVerificationString: pathParts.pop()
        }).then((response) => {
            console.log(response)
            if (response.data.msg == "true") {
                setVerification(true)
            }
        });
       
    }, []);

    
    return (
        <>
            <div>
                <Navbar site={"/"} />
            </div>

            Account {verification ? "verified" : "not verified" }.

        </>
    );
}

export default AccountVerification;