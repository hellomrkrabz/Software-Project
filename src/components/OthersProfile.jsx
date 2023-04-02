import React, { useEffect, useState, Component } from "react";

function OthersProfile(props) {

  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 bg-info">
                    <p>img</p>
                    <p>userName</p>
                    <p>stars</p>
                    <p>where</p>
                    <p>bio</p>
                </div>

                <div className="col-8">
                    <p>wanted books</p>
                    <p>offered books</p>
                    <p>wanted books</p>
                    <p>
                        <p>opinion1</p>
                        <p>opinion2</p>
                    </p>
                </div>  

                <div className="col-2">
                    <p>button1</p>
                    <p>button2</p>
                    <p>button3</p>
                </div>
            </div>
        </div>
    </>
  );
}

export default OthersProfile;
