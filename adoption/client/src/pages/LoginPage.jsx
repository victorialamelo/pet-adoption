import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function LoginPage() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs(event)) {
      return;
    }

    console.log("handleSubmit Login");
  };

  const validateInputs = (event) => {
    event.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

    return (
      <>
        <NavBar />
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h1 className="text-center mb-3">Welcome Back!</h1>
                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="your@email.com" />
                    {emailError && <p className="error-message">{emailErrorMessage}</p>}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" className="form-control" placeholder="••••••••" />
                    {passwordError && <p className="error-message">{passwordErrorMessage}</p>}
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <hr />
                <p>Don't have an account yet? Click here to <Link className="signup" to="/signup">Sign Up</Link>

                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
