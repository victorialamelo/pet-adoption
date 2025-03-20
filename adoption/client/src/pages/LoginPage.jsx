import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../AuthContext";
import { backendLoginUser } from "../backend";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth(); // this function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();
  // const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting login form..."); //Debugging
    console.log("Email:", email); //Debugging
    console.log("Password:", password); //Debugging

    if (!validateInputs()) {
      console.log("Validation failed"); //Debugging
      return;
    }

    try {
      const data = await backendLoginUser({ email, password });
      login(data.user.user_id, data.token);
      localStorage.setItem("role", data.user.usertype);
      console.log("Login successful:", data.user);

    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      navigate(`/userdashboard`);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="login p-4">
              <h1 className="text-center mb-3">Welcome Back!</h1>
              <form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Updates state
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
                    autoComplete=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //Update state
                  />
                  {passwordError && (
                    <p className="error-message">{passwordErrorMessage}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <hr />
              <p>
                Don't have an account yet? Click here to{" "}
                <Link className="signup" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
