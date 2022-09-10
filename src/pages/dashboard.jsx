// import React, { useRef } from 'react';
// import {firestore} from "../firebase";
// import { addDoc, collection } from "@firebase/firestore";


// export default function Dashboard() {
//     const messageRef = useRef();
//     const ref = collection(firestore, "messages");

//     const handleSave = async(e) => {
//         e.preventDefault();
//         console.log(messageRef.current.value);

//         let data = {
//             message:messageRef.current.value,
//         }

//         try {
//             addDoc(ref, data);
//         }catch(e){
//             console.log(e);
//         }
//     }

//     return (
//         <div>
//             <form onSubmit={handleSave}>
//                 <label>Enter Message</label>
//                 <input type="text" ref={messageRef} />
//                 <button type="submit">Save</button>
//             </form>
//             <br></br>
//             <br></br>
//             <strong>~~~~~~~~~~~</strong>
//             <br></br>
//             <br></br>
//         </div>
//     )
// }

// ========
// ========
// ========
// ========

import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

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
    </div>
  );
}