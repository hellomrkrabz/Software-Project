import React from "react";
import Router from "react-easy-router";
import Register from "./sites/Register.jsx";
import BookInfo from "./sites/BooksInfo.jsx";
import Login from "./sites/Login.jsx"
import Profile from "./sites/Profile.jsx";

function App() {

  const routes = [
    {
      path: '/',
      element: <BookInfo />,
    },
    {
      path: '/Register',
      element: <Register />,
    },
    {
      path: '/Login',
      element: <Login />,
    },
    {
      path: '/Profile',
      element: <Profile />,
    }
  ];

  return(
    <Router routes={routes} />
  );
}

export default App;
