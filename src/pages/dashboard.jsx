import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../App.css";
import { auth, firestore } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const messageRef = useRef();
  const ref = collection(firestore, "messages");

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) navigate("/");

  return (
    <div>
      <h4> User Logged In: </h4>
      <p>{user?.email}</p>

      <button onClick={logout}> Sign Out </button>
      <form onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Save</button>
      </form>
      <br></br>
      <br></br>
      <strong>~~~~~~~~~~~</strong>
      <br></br>
      <br></br>
    </div>
  );
}
