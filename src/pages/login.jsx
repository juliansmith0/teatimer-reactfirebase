import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
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

  if (user) navigate("/dashboard");

//   Change page background
//   document.body.classList.add('tea-green');
  document.body.style = "background: #8b9474;";

  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-3xl shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-50 border-gray-800">
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  User Login
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
                    value={loginEmail}
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
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
                    value={loginPassword}
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
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

              {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

              <div>
                <button
                  type="submit"
                  onClick={login}
                  className="group relative flex w-full justify-center rounded-xl border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  Sign in
                </button>
              </div>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
