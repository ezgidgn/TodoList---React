import Crud from "./components/Crud";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useState, React, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db, storage, auth } from "./../src/firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        {isLoggedIn ? (
          <Route path="/" element={<Crud />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
