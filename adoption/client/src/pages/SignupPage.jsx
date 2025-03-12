import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { AddNewUser, backendAuthLogin, backendCreateUser } from "../backend";
// import { hasSession, saveSession, getCurrentSession } from "../session";

export default function SignupPage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const createUser = async (formData, event) => {
    event.preventDefault();
    const newUser = {
      user_name: formData.get("name"),
      date_of_birth: formData.get("date"),
      city: formData.get("city"),
      zipcode: Number(formData.get("zipcode")), // transform to number due to original string value
      phone: Number(formData.get("phone")),
      email: formData.get("email"),
      password: formData.get("password"),
      entity_name: formData.get("shelter"),
      entity_website: formData.get("website"),
      entity_registration_id: Number(formData.get("registrationid")),
    };

    // TODO: create backendCreateUser function in backend.js
    const addedUser = await backendCreateUser(newUser); // send the new object (with all the input from new user) to backend

    // TODO: integrate authLogin function in backend.js
    const { token } = await backendAuthLogin({ email, password });
    saveSession(token);

    console.log("handleSubmit Sign Up");

    // redirect user to Dashboard page/user_id
    navigate(`/userdashboard/${addedUser.user_id}`);
  };

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h1 className="text-center mb-3">Sign Up</h1>
              <form action={createUser}>
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
                      onChange={(e) => setRole(e.target.value)}
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
                      onChange={(e) => setRole(e.target.value)}
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
