import React, { useEffect, useState } from "react";
import { v4 } from 'uuid';
import banana from './../media/banana.png'



function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <a className="navbar-brand btn" href="/">
                Softwaree Project
                <img src={banana} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            </a>

            {props.site == "Register" && 
                <a className="navbar-brand btn" href="/Login">Login</a>
            }
            {props.site == "Login" && 
                <a className="navbar-brand btn" href="/Register">Register</a>
            }
            {props.site == "/" && 
                <>
                    <a className="navbar-brand btn offset-md-8" href="/Login">Login</a>
                    <a className="navbar-brand btn" href="/Register">Register</a>
                </>
            }
            
        </div>
    </nav>
  );
}

export default Navbar;
