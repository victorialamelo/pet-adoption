import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
//import NavBar from "../components/NavBar";
import PetAdopterDashboard from "../components/PetAdopterDashboard";
import PetPosterDashboard from "../components/PetPosterDashboard";
import "../App.css";

export default function UserDashboard() {
  const [activeView, setActiveView] = useState("adopting"); // Default to post view (current functionality)
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    setActiveView(role);
  }, [role]);

  const handleViewChange = (view) => {
    setActiveView(view);
    localStorage.setItem("role", view); // Store the selected view in localStorage
  };
  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      {/*<NavBar />*/}
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div className="" aria-label="Dashboard View Toggle">
              <button
                type="button"
                className={`btn ${activeView === "adopting" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleViewChange("adopting")}
              >
                Demo Adopter View
              </button>
              <button
                type="button"
                className={`btn ${activeView === "posting" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleViewChange("posting")}
              >
                Demo Poster View
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeView === "adopting" ? (
        <PetAdopterDashboard />
      ) : (<PetPosterDashboard />
      )}
    </>
  );
}
