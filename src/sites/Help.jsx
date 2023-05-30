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

            <div>
                <strong>How can we help You?</strong>
            </div>

            <div class="accordion" id="helpAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#wantedBooks" aria-expanded="false" aria-controls="wantedBooks">
                            Wanted Books
                        </button>
                    </h2>
                    <div id="wantedBooks" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                        <div class="accordion-body">
                            These are the books that user wants to borrow from other users in future. On your profile you can add one with button "Add new".
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#offeredBooks" aria-expanded="false" aria-controls="offeredBooks">
                            Offered Books
                        </button>
                    </h2>
                    <div id="offeredBooks" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                        <div class="accordion-body">
                            These are the books that user is offering to borrow to other users. This list includes books that are not borrowed and books that are borrowed to someone else. On your profile you can add one with button "Add new".
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#personalLibrary" aria-expanded="false" aria-controls="collapseThree">
                            Personal Library
                        </button>
                    </h2>
                    <div id="personalLibrary" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                        <div class="accordion-body">
                        These are the books that user have in his private library. This list includes books that are not offered and books that are offered to someone else. On your profile you can add one with button "Add new".
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#transactions" aria-expanded="false" aria-controls="transactions">
                        Transactions
                    </button>
                    </h2>
                    <div id="transactions" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                    <div class="accordion-body">
                        aaaaaaaa
                    </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#userRating" aria-expanded="false" aria-controls="userRating">
                        User Rating
                    </button>
                    </h2>
                    <div id="userRating" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                    <div class="accordion-body">
                        In this sections you can see other users opinion about user. If you see something inappropriate or off topic you can report review. You can write an opinion to user to or from you are borrowing when the transaction is finished.
                    </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Help;
