import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import $ from 'jquery'
import collapse from "bootstrap/js/src/collapse";

function Help(props) {

    useEffect(() => {
        const handleHashChange = () => {
          const hash = window.location.hash;
          const targetAccordion = $(hash);
    
          if (targetAccordion.length) {
            // Scroll to the accordion item if needed
            $('html, body').animate(
              {
                scrollTop: targetAccordion.offset().top,
              },
              'slow'
            );
    
            // Open the accordion item
            targetAccordion
              .closest('.accordion')
              .find('.accordion-header')
              .removeClass('collapsed')
              .attr('aria-expanded', 'true');
            targetAccordion.addClass('show');
          }
        };
    
        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
    
        // Check the initial hash on component mount
        handleHashChange();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('hashchange', handleHashChange);
        };
      }, []);


    return (
        <>
            <div>
                <Navbar site={"/Help"} isLoggedIn={props.isLoggedIn} username={props.username}/>
            </div>

            <div className="text-center">
                <h2>How can we help You?</h2>
            </div>
            
            <div className="container">
                <div className="accordion" id="helpAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wantedBooks" aria-expanded="false" aria-controls="wantedBooks">
                                Wanted Books
                            </button>
                        </h2>
                        <div id="wantedBooks" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                These are the books that user wants to borrow from other users in future. On your profile you can add one with button "Add new".
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#offeredBooks" aria-expanded="false" aria-controls="offeredBooks">
                                Offered Books
                            </button>
                        </h2>
                        <div id="offeredBooks" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                These are the books that user is offering to borrow to other users. This list includes books that are not borrowed and books that are borrowed to someone else. On your profile you can add one with button "Add new".
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#personalLibrary" aria-expanded="false" aria-controls="personalLibrary">
                                Personal Library
                            </button>
                        </h2>
                        <div id="personalLibrary" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                These are the books that user have in his private library. This list includes books that are not offered and books that are offered to someone else. This section is only visable in your profile. On your profile you can add one with button "Add new".
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#transactions" aria-expanded="false" aria-controls="transactions">
                                Transactions
                            </button>
                        </h2>
                        <div id="transactions" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                You can borrow the book from other user offered books, when book is available at the time you can proceed to transation details, otherwise you will be put in a queue. When you are offering book to other users you will be notified if other users want to borrow your book, you can check their profiles and decide if you will accept lending or not.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#userRating" aria-expanded="false" aria-controls="userRating">
                                User Rating
                            </button>
                        </h2>
                        <div id="userRating" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                In this sections you can see other users opinion about user. If you see something inappropriate or off topic you can report review. You can write an opinion to user to or from you are borrowing when the transaction is finished.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#profile" aria-expanded="false" aria-controls="profile">
                                Profile
                            </button>
                        </h2>
                        <div id="profile" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                            <div className="accordion-body">
                                In this sections you can see user profile. You can check user details, offered and wanted books and rating. On your profile you can edit your details using button "Edit Profile". 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;
