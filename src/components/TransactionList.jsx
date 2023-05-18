import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Transaction from "./Transaction.jsx"
import { v4 } from "uuid";
import TransactionDetails from "./TransactionDetails.jsx";
import axios from 'axios'

function TransactionList(props) {
  //temporary, books - taken from the db
    const [showDetails, setShowDetails] = useState(false);


    // for details page usage - gets set in Transaction when show details is clicked
    const [detailsKey, setDetailsKey] = useState(0);

    //All this gets updated from db whenever detailsKey changes
    var sessionUsername = sessionStorage.getItem("sessionUserUsername");
    var users = [];


    const [transactions, setTransactions] = useState([]);
    const [usernames, setUsernames] = useState([]);

    const [detailsUsername, setDetailsUsername] = useState("");
    const [detailsBook, setDetailsBook] = useState({ title: "Instytut", author: "Stephen King", link: "https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", imageLinks: { smallThumbnail: "https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg" } });
    const [detailsTitle, setDetailsTitle] = useState("");
    const [detailsAuthor, setDetailsAuthor] = useState("");
    const [detailsIsbn, setDetailsIsbn] = useState("");
    const [detailsCondition, setDetailsCondition] = useState("");
    const [detailsReservationDate, setDetailsReservationDate] = useState("");
    const [detailsRentDate, setDetailsRentDate] = useState("");
    const [detailsStatus, setDetailsStatus] = useState("");
    const [detailsReturnDate, setDetailsReturnDate] = useState("");
    const [detailsIsFinished, setDetailsIsFinished] = useState((props.status === "finished" || props.status === "failed") ? true : false); //finished/failed do zmiany na faktyczne statusy - ¿eby pokazywac guzik do recenzji

    //Getting user's all transactions'
    useEffect(() => {
        
        axios.get("http://localhost:5000/api/transactions/" + sessionUsername).then((response) => {
            var trans = response.data.transactions;
            setTransactions(trans);
            users = [];
            //console.log(trans)
            return trans;
        }).then((r) => {
            for (let i = 0; i < r.length; i++) {
                
                axios.get("http://localhost:5000/api/user/" + r[i].borrower_id).then((resp) => {
                    //console.log(resp);
                    var username_json = resp.data.user;
                    console.log(users);
                    users.push(username_json.username);
                })
            }    
            setUsernames(users);            
        })
        console.log(usernames);

    }, [])

  

    //Updating data from db whenever detailsKey changes
    useEffect(() => {
        //placeholder until backend is ready
        // Take all details for a transaction from db and assign them to appropriate hooks (axios)
        /*
        axios.get("http://localhost:5000/api/transaction/" + sessionUsername + "/" + detailsKey).then((response) => {
            //zamiast console log ustawianie hookow
            var jason = response.data; 
            //console.log(jason);
            if (jason.msg != "it no good") {
                setDetailsUsername(jason.borrower_id);
                setDetailsReservationDate(jason.reservation_date);
                setDetailsRentDate(jason.rent_date);
                setDetailsReturnDate(jason.return_date);
                setDetailsStatus(jason.state);

                //po zmianie api jeszcze ksi¹¿kowe badziewie
            }
        })
        */
    }, [detailsKey])


    //Axios - get all transaction ids

    return (
        <>
            {
                showDetails ?
                    <>
                        <TransactionDetails key={v4()} detailsKey={detailsKey} bookID="2137" book={detailsBook} updateShowDetailsFromChildren={setShowDetails}> </TransactionDetails >
                    </>
                    :
                    <>
                        {transactions.map((t) =>
                            <div key={t.id}>
                                <div>
                                    <br></br>
                                </div>
                                <Transaction user={t.borrower_id} detailsKey={detailsKey} reservationDate={t.reservation_date} updateShowDetailsFromChildren={setShowDetails} updateDetailsKey={setDetailsKey} status={t.state} transactionID={transactions.id}  book={t.book_id}> </Transaction>
                            </div>
                        )}
                    </>
            }
        </>
  );
}

export default TransactionList;
