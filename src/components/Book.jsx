import React, { useEffect, useState } from "react";

function Book(props) {
    return(
        <div>
            <div>{props.title}</div>
            <div>{props.author}</div>
        </div>
    );
}

export default Book;
