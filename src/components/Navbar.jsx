import React, { useEffect, useState } from "react";
import banana from './../media/banana.png'



function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-lg bg-banana-blue">
        <div className="container-fluid">
            <a className="navbar-brand btn" href="/">
                Softwaree Project
                <img src={banana} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            </a>

            <div className="d-flex flex-end">
            {props.site == "Register" && 
                <a className="btn btn-outline-banana-blue" href="/Login">Login</a>
            }
            {props.site == "Login" && 
                <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
            }
            {props.site == "/" && 
                <>
                    <a className="btn btn-banana-white-outline" href="/Login">Login</a>
                    <a className="btn btn-banana-white-outline" href="/Register">Sign Up</a>
                </>
            }
            </div>

        </div>
    </nav>
  );
}

export default Navbar;
