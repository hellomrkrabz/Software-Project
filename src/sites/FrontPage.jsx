import React, { useState } from "react";
import Navbar from "../components/Navbar";
import banana from "../media/banana.png"
import win31 from "../media/win31.png"
import korwin from "../media/korwin.png"
import pattern from "../media/datapattern.png"
import jojo from "../media/jojo.png"
import beer from "../media/beer.png"
import Textfield from "@mui/material/TextField"

function FrontPage(props) {
    

    return (
        <>
            <div>
                <Navbar site={"/FrontPage"} isLoggedIn={props.isLoggedIn}/>
            </div>

            {props.isLoggedIn ? 
            <>
                <div className="container-fluid">
                    <div className="row">
                        <img src={beer} height="300px"/>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <button>My Library</button>
                        </div>
                        <div className="col-2">
                            <button>Genre</button>
                        </div>
                        <div className="col-2">
                            <button>Location</button>
                        </div>
                        
                        <div className="col-3">
                            <Textfield id="searchBar" label="Outlined" variant="outlined" ><img src={banana} height="20px"/></Textfield>
                        </div>
                        <div className="col-2">
                            <button>Search</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <img src={win31} />
                            <p>Windows 3.1 PL</p>

                            "MS Windows 3.1 PL" to książka przeznaczona dla szerokiego kręgu odbiorców zainteresowanych"<br />
                            <button>Details</button>
                        </div>

                        <div className="col-3">
                            <img src={korwin} />
                            <p>Niebezpieczne Ubezpieczenia</p>

                            "W czasach mody, czy wręcz manii ubezpieczeniowej, książka jest niezwykle cenną odtrutką na "<br />
                            <button>Details</button>
                        </div>

                        <div className="col-3">
                            <img src={pattern} />
                            <p> Feature Selection for Data and Pattern Recognition</p>

                            "This book presents recent developments and research trends in the field of feature selection for data and pattern recognition, highlighting a number of latest advances."<br />
                            <button>Details</button>
                        </div>

                        <div className="col-3">
                            <img src={jojo} />
                            <p>JOJO’s Bizzare Adventure</p>

                            "A multigenerational tale of the heroic Joestar family and their never-ending battle against evil! "<br />
                            <button>Details</button>
                        </div>
                    </div>
                    
                </div> 
            </>
            :
            <>
                <div>xd</div>
                <div>logged</div>   
            </>
            }
        </>
    );
}

export default FrontPage;
