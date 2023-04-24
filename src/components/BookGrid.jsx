import { useState } from "react";
import Book from "./Book";
import { v4 } from "uuid";

function BookGrid(props)
{
    return(
        <>
            <div className="container-fluid bg-primary">
                <div className="row">
                    {props.books.map((b)=>
                        <Book variant="small" {...b} key={v4()}></Book>
                    )}
                </div>
            </div>
            
        </>
    );
}

export default BookGrid;