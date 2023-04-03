import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './../style/bootstrap/css/main_style.css'

function Book(props) {
    return(
        <div key={props.id} className="d-flex flex-column align-items-center">
            <Link to={props.link}>
                <div >
                    <div className="book-title">
                        {props.title}
                        {props.author}
                    </div>
                    <img src={props.src} alt="book" height="200"/>
                </div> 
            </Link>
        </div>
    );
}

export default Book;
