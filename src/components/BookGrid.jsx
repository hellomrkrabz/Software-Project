import { useState } from "react";
import Book from "./Book";
import { v4 } from "uuid";

function BookGrid(props)
{
    return(
        <>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-4  row-cols-xl-6 row-cols-xxl-8 gy-3">
                    {props.books.map((b)=>
                        <Book variant={props.offers ? "small": "deprecatedSmall"} {...b} key={v4()}></Book>
                    )}
                </div>
            </div>
            
        </>
    );
}

export default BookGrid;