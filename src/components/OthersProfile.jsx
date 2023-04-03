import React, { useEffect, useState, Component } from "react";
import ProfileBookList from "./ProfileBookList";
import ProfileOpinionsList from "./ProfileOpinionsList";
import ScoreComponnent from "./ScoreComponent";

function OthersProfile(props) {

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 bg-info">
                    <div>
                        <img className="circle col-12"src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/01/14/12/monkey-bananav3.jpg?width=1200" height="300px"alt="monke"/> 
                    </div>
                    <div>userName</div>
                    <div>
                        stars
                        <ScoreComponnent score={3}></ScoreComponnent>
                    </div>
                    <div>&#128205;where</div>
                    <div>bio</div>
                </div>
                
                <div className="col-10 mt-5">

                    <ProfileBookList title={"Wanted Books"} moreLink={"/WantedBooks"}></ProfileBookList>

                    <ProfileBookList title={"Offered Books"} moreLink={"/OfferedBooks"} addLink={"/OfferedBooks"}></ProfileBookList>

                    <ProfileOpinionsList 
                        sender1={"idiot1"} text1={"not gut"} moreLink={"/Opinions"}
                        sender2={"idiot2"} text2={"it was great 2/10"}>
                    </ProfileOpinionsList>
                 </div>
            </div>
        </div>
    </>
  );
}

export default OthersProfile;
