import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../media/default/logos/01Logo_White.png";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (user) navigate("/dashboard");


//   Change page background
//   document.body.classList.add('tea-green');
document.body.style = "background: #8b9474;";

return (
  <>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <img src={ logo } alt="Tea Timer Logo" className="mx-auto h-20 w-auto mb-20 drop-shadow-lg"/>
      <div class="w-full bg-white rounded-3xl drop-shadow-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-100 border-gray-800">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              {/* <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
              <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                User Registration
              </h2>
            </div>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  value={registerEmail}
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="my-2 relative block w-full appearance-none rounded-none rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={registerPassword}
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="my-1 relative block w-full appearance-none rounded-none rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={register}
                className="group relative flex w-full justify-center rounded-xl border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Register
              </button>
            </div>
            <p class="text-sm">
              Already have an account? <Link to="/" class="text-amber-600 hover:text-amber-500">Sign in!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);
}