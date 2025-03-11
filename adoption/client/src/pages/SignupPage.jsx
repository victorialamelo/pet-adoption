import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";

export default function SignupPage() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [role, setRole] = useState(""); // "adopting" or "posting"
  const [shelterName, setShelterName] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs(event)) {
      return;
    }

    console.log("handleSubmit Sign Up");
    // const data = new FormData(event.currentTarget);
    // const userData = {
    //   name: data.get('name'),
    //   username: data.get('email'),
    //   password: data.get('password'),
    // };

    // const credentials = {
    //   username: data.get('email'),
    //   password: data.get('password'),
    // };

    // try {
    //   const response = await axios.post("/api/auth/register", userData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     localStorage.setItem("token", response.data.token);
    //     auth.login(credentials);
    //   } else {
    //     alert("Error: " + response.data.message);
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    // }
  };

  const validateInputs = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
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
              <h1 className="text-center mb-3">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    onInput={(e) => {
                      let value = e.target.value;
                      if (value.length > 0) {
                        e.target.value =
                          value.charAt(0).toUpperCase() + value.slice(1);
                      }
                    }}
                    required
                  />
                  {nameError && (
                    <p className="error-message">{nameErrorMessage}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                  <label
                    htmlFor="date"
                    className="form-label"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    style={{
                      paddingRight: "5px",
                      paddingLeft: "5px",
                      borderRadius: "5px",
                      fontSize: "15px",
                      backgroundColor: "#fff",
                      color: "#000",
                    }}
                    required
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    placeholder="City of residence"
                    onInput={(e) => {
                      let value = e.target.value;
                      if (value.length > 0) {
                        e.target.value =
                          value.charAt(0).toUpperCase() + value.slice(1);
                      }
                    }}
                    required
                  />
                </div>

                {/* Zipcode */}
                <div className="mb-3">
                  <label htmlFor="zipcode" className="form-label">
                    Zipcode
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    className="form-control"
                    placeholder="08020"
                    maxLength="5"
                    inputMode="numeric"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="665555333"
                    maxLength="13"
                    inputMode="numeric"
                    defaultValue="+34 "
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="your@email.com"
                    required
                  />
                  {emailError && (
                    <p className="error-message">{emailErrorMessage}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    required
                  />
                  {passwordError && (
                    <p className="error-message">{passwordErrorMessage}</p>
                  )}
                </div>

                {/* Are they adopting or posting? */}
                <div className="mb-3">
                  <label className="form-label">
                    Are you adopting or posting a pet?
                  </label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="adopting"
                      name="role"
                      value="adopting"
                      className="form-check-input"
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="adopting" className="form-check-label">
                      Adopting
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="posting"
                      name="role"
                      value="posting"
                      className="form-check-input"
                      onChange={handleRoleChange}
                    />
                    <label htmlFor="posting" className="form-check-label">
                      Posting a pet
                    </label>
                  </div>
                </div>

                {/* Shelter/Organization Name (Only if posting a pet) */}
                {role === "posting" && (
                  <div className="mb-3">
                    <label htmlFor="shelter" className="form-label">
                      Shelter/Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="shelter"
                      name="shelter"
                      className="form-control"
                      placeholder="Enter shelter name (if applicable)"
                      value={shelterName}
                      onChange={(e) => setShelterName(e.target.value)}
                    />
                  </div>
                )}

                {role === "posting" && (
                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">
                      Shelter/Organization Website (Optional)
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      className="form-control"
                      placeholder="www.website.com"
                      value={shelterName}
                      onChange={(e) => setShelterName(e.target.value)}
                    />
                  </div>
                )}

                {role === "posting" && (
                  <div className="mb-3">
                    <label htmlFor="registrationid" className="form-label">
                      Shelter/Organization Registration Number (Optional)
                    </label>
                    <input
                      type="text"
                      id="registrationid"
                      name="registrationid"
                      maxLength="9"
                      className="form-control"
                      placeholder="A12345678"
                      value={shelterName}
                      onChange={(e) => setShelterName(e.target.value)}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>

              <hr />
              <p className="text-center">
                Already have an account?{" "}
                <a href="/Login" className="text-decoration-none">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
