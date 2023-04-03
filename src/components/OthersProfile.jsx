import React, { useEffect, useState, Component } from "react";

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
                    <div>stars ★☆☆☆☆</div>
                    <div>&#128205;where</div>
                    <div>bio</div>
                </div>
                
                <div className="col-10 mt-5">

                    <div className="row">
                        <p>Wanted books</p>
                        <div className="d-flex justify-content-around col-10">

                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div> 
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>      
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>  
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>

                        </div>
                        <div className="align-self-center col-2">
                                <button className="btn btn-banana-blue col-10">See more 1</button>
                        </div>
                    </div>

                    <div className="row">
                        <p>Offered books</p>
                        <div className="d-flex justify-content-around col-10">
                            
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div> 
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>      
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>  
                            <div >
                                <div className="book-title">test</div>
                                <img className="" src="https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" alt="book" height="200"/>
                            </div>

                        </div>
                        <div className="align-self-center col-2">
                                <button className="btn btn-banana-blue col-10">See more 2</button>
                        </div>
                    </div>

                    <div className="mt-5 row">
                        <div className="d-flex col-10 justify-content-around">
                            <div className="card text-center col-4">
                                <div className="card-header">
                                    User1 ★☆☆☆☆
                                </div>
                                <div className="card-body">
                                opinion1opinion1opinion1opinion1opinion1opinion1opinion1opinion1
                                opinion1opinion1opinion1opinion1opinion1opinion1opinion1opinion1
                                opinion1opinion1opinion1opinion1opinion1opinion1opinion1opinion1
                                opinion1opinion1opinion1opinion1
                                </div>
                            </div>

                            <div className="card text-center col-4">
                                <div className="card-header">
                                    User2 ★☆☆☆☆
                                </div>
                                <div className="card-body">
                                    opinion2opinion2opinion2opinion2opinion2opinion2opinion2opinion2
                                    opinion2opinion2opinion2opinion2opinion2opinion2opinion2opinion2
                                    opinion2opinion2opinion2opinion2opinion2opinion2opinion2opinion2
                                    opinion2opinion2opinion2opinion2opinion2opinion2opinion2opinion2
                                    opinion2opinion2opinion2opinion2opinion2opinion2opinion2opinion2
                                </div>
                            </div>      
                        </div>

                        <div className="align-self-center col-2">
                            <button className="btn btn-banana-blue col-10">See more 3</button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </>
  );
}

export default OthersProfile;
