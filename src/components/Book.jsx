import React, { useEffect, useState } from "react";
import './../style/bootstrap/css/main_style.css'

function Book(props) {
    return(
        <div className="d-flex flex-column align-items-center bg-secondary bg-gradient mt-2 col-6">
            <div className="h1">{props.title}</div>
            <div>{props.author}</div>
        </div>
    );
}

export default Book;
