import { Link } from "react-router-dom";
import Book from "./Book.jsx";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField"


function TransactionDetails(props) {
    //const [showDetails, setShowDetails] = useState(props.updateShowDetailsFromChildren);
    return (
        <>  
            <br></br>
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="row col-10 border bg-banana-blue bg-opacity-25 border-dark justify-content-between card">
                    <div className="card-body justify-content-between align-items-center row">
                        <div className="fw-normal fs-3 text-shadow-light mb-2">
                            Transaction Details:
                        </div>
                        <div className="fw-normal fs-5 text-shadow-light mb-2">
                            Username: PLACEHOLDER
                        </div>
                        <br></br>
                        <div className="col-2">
                            <Book variant="transactionDetails" {...props.book} key={v4()}> </Book>
                        </div>
                        <div className="col-3 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Title:
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="title"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Author:                             
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="author"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                ISBN:                                 
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="isbn"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>                         
                            <div className="mb-2">
                                Book Condition:                               
                            </div>
                            <div>
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="bookCondition"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                        </div>
                        <div className="col-3 fw-normal fs-5 text-shadow-light">
                            <div className="mb-2">
                                Reservation Date:
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="reservationDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Rent Date:
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="rentDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                            <div className="mb-2">
                                Return Date:
                            </div>
                            <div className="mb-2 col-8">
                                <TextField
                                    disabled
                                    id="returnDate"
                                    fullWidth
                                    value="PLACEHOLDER"
                                />
                            </div>
                        </div>
                        <div className="col-4 row h-25">
                            <div className="col-6 d-flex align-items-center justify-content-center bg-secondary text-black">
                                PLACEHOLDER
                            </div>
                            <button className="btn btn-banana-primary col-6" onClick={() => { props.updateShowDetailsFromChildren(false) }}>Hide Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;
