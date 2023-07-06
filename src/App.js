
import Crud from "./components/Crud";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useState, React, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db, storage, auth } from "./../src/firebase";
import {query, collection, onSnapshot, updateDoc, doc, addDoc} from "firebase/firestore"

const style = {
  bg: 'h-screen w-screen p-4 bg-gradient-to-r from-[#d9d7ce] to-[#453a06]',
  container: "bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4",
  heading: "text-3xl font-bold text-center text-gray-800 p-2",
  form: "flex justify-between",
  input: "border p-2 w-full text-xl",
  button: "border p-4 ml-2 bg-gray-500 text-slate-100",
  count: "text-center p-2"
}


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
