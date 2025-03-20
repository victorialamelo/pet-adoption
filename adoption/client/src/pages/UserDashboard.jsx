import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
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

    // REDIRECT IF USER NOT AUTHENTICATED
    if (!user) {
      navigate("/login");
      return;
    }
  }, [role, navigate, user]);

  const handleViewChange = (view) => {
    setActiveView(view);
    localStorage.setItem("role", view); // Store the selected view in localStorage
  };



  return (
    <>
      <div className="dashboard-toggle w-100 pt-4 mb-4">
        <div className="row ">
          <div className="col-12 d-flex justify-content-center">
            <div className="" aria-label="Dashboard View Toggle">
              <button
                type="button"
                className={`btn ${activeView === "adopting" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleViewChange("adopting")}
              >
                Pets I'm Adopting
              </button>
              <button
                type="button"
                className={`btn ${activeView === "posting" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleViewChange("posting")}
              >
                Pets I'm Rehoming
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
