import React from "react";
import ScoreComponnent from "./ScoreComponent";
import reportWarning from "../media/reportWarning.png"
import IconButton from "@mui/material/IconButton"

function ProfileOpinionComponent(props) {

    console.log(props)

    return (
        <>
            <div className="bg-light rounded-3 d-flex flex-column">
                <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {props.details.username}
                    <div className="col-7">
                        <ScoreComponnent score={props.details.score}/>
                    </div>
                </div>
                <div className="flex-grow-1 d-flex px-3 pt-3">
                    <p className="col-9 overflow-hidden" style={{height: "70px",}}>{props.details.content}</p>

                </div>
            </div>
        </>
    );
}

export default ProfileOpinionComponent;
