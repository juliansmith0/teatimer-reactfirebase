import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../App.css";
import { auth, firestore } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const teaRef = useRef();
  const temperatureRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const ref = collection(firestore, "teas");
  const user = auth.currentUser;

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(teaRef.current.value);
    console.log(temperatureRef.current.value);
    console.log(minuteRef.current.value);
    console.log(secondRef.current.value);

    let data = {
      tea: teaRef.current.value,
      associatedUser: user.uid,
      temperature: temperatureRef.current.value,
      steepingMinutes: minuteRef.current.value,
      steepingSeconds: secondRef.current.value
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

  if (!user) navigate("/login");

  return (
    <div>
      <h4> User Logged In: </h4>
      <p>{user?.email}</p>

      <button onClick={logout}> Sign Out </button>
      <form onSubmit={handleSave}>
        <label>Enter Tea</label>
        <input type="text" ref={teaRef} />
        <label>Steeping Temp (in degrees Fahrenheit)</label>
        <input type="number" min="0" max="500" ref={temperatureRef} />
        <label>Steeping Time (in minutes and seconds)</label>
        <input type="number" min="00" max="59" ref={minuteRef} />
        <input type="number" min="00" max="59" ref={secondRef} />
        <button type="submit">Save</button><input type="reset" />
      </form>
      <br></br>
      <br></br>
      <strong>~~~~~~~~~~~</strong>
      <br></br>
      <br></br>
    </div>
  );
}
