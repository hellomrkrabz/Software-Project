import React from "react";
import { Link } from "react-router-dom";
import banana from "./../media/banana.png"
import './../style/bootstrap/css/main_style.css'
import Textfield from "@mui/material/TextField"

function Book(props) {

    return(
        <>
        {props.variant==="small" &&
        <>
            <div className="col">
                <div key={props.id} className="d-flex flex-column align-items-center">
                    <Link to={props.link}>
                        <div >
                            <div className="book-title">
                                <div className="d-flex flex-column justify-content-center h-100">
                                    {props.title}<br/>
                                    {props.authors!==undefined &&
                                        props.authors[0]
                                    }
                                </div>
                            </div>
                            {props.imageLinks!==undefined && props.imageLinks.smallThumbnail !== undefined &&
                                <img src={props.imageLinks.smallThumbnail} alt="book" height="200" width="130"/>
                            }

                            {props.imageLinks!==undefined && props.imageLinks.smallThumbnail === undefined &&
                                <img src={banana} alt="book" height="200" width="130"/>
                            }
                            
                        </div> 
                    </Link>
                </div>
            </div>
        </>
        }

        {props.variant==="medium" &&
        <>
            <div className={`col-12 flex-grow-1 ${props.border ? "border":""}` }>
                <img src={props.src} style={{width: '100%',}}/>
                <p>{props.title}</p>

                {props.description}<br />

                <Link to={props.link}>
                    <button className="btn btn-banana-primary-dark ms-2 mt-4">Details</button>
                </Link>
            </div>
        </>
        }

        {props.variant === "transactionDetails" &&
            <>
                <div className="col">
                    <div key={props.id} className="d-flex flex-column align-items-center">
                        <Link to={props.link}>
                            <div >
                                {props.imageLinks !== undefined && props.imageLinks.smallThumbnail !== undefined &&
                                    <img src={props.imageLinks.smallThumbnail} alt="book" style={{width: "100%",height:"100%", objectFit: "cover"}}/>
                                }

                                {props.imageLinks !== undefined && props.imageLinks.smallThumbnail === undefined &&
                                    <img src={banana} alt="book" height="500" width="325" />
                                }

                            </div>
                        </Link>
                    </div>
                </div>
            </>
        }

        {props.variant==="list" &&
        <>
            <div className="row col-11" value={props.industryIdentifiers[0].identifier}>
                <div className="col-4 bg-light" value={props.industryIdentifiers[0].identifier}>
                    <div value={props.industryIdentifiers[0].identifier}>
                        {props.title}
                    </div>
                </div>
                <div className="col-4 bg-danger" value={props.industryIdentifiers[0].identifier}>
                    <div value={props.industryIdentifiers[0].identifier}>
                        {props.authors[0]}
                    </div>
                </div>
                <div className="col-4 bg-success" value={props.industryIdentifiers[0].identifier}>
                    <div value={props.industryIdentifiers[0].identifier}>
                        {props.industryIdentifiers[0].identifier}
                    </div>
                </div>
            </div>
        </>
        }
        </>
    );
}

export default Book;
