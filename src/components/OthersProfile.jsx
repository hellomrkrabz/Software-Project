import React, { useEffect, useState, Component } from "react";
import ProfileBookList from "./ProfileBookList";
import ProfileOpinionsList from "./ProfileOpinionsList";
import ScoreComponnent from "./ScoreComponent";
import TextField from "@mui/material/TextField"
import ProfileInfoComponent from "./ProfileInfoComponent";

function OthersProfile(props) {

  return (
    <>
        <div className="container-fluid flex-grow-1 d-flex">
            <div className="row flex-grow-1">
                <div className="col-2 bg-banana-blue bg-opacity-25">
                    <ProfileInfoComponent {...props}></ProfileInfoComponent>
                </div>
                
                <div className="col-10 mt-5">

                    <ProfileBookList title={"Wanted Books"} moreLink={"/WantedBooks"}></ProfileBookList>

                    <ProfileBookList title={"Offered Books"} moreLink={"/OfferedBooks"} addLink={"/OfferedBooks"}></ProfileBookList>

                    <ProfileOpinionsList 
                        sender1={"JustAnormalUser"} text1={"not gut"} moreLink={"/Opinions"}
                        sender2={"AdiffrentUser"} text2={"it was great 2/10"}>
                    </ProfileOpinionsList>
                 </div>
            </div>
        </div>
    </>
  );
}

export default OthersProfile;
