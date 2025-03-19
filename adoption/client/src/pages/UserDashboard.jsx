import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import PetAdopterDashboard from "../components/PetAdopterDashboard";
import PetPosterDashboard from "../components/PetPosterDashboard";
import "../App.css";

export default function UserDashboard() {
  const [activeView, setActiveView] = useState("post"); // Default to post view (current functionality)
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    setActiveView(role);
  }, [role]);

  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <NavBar />

      {/* Dashboard View Toggle */}
      <div className="dashboard-view">
          <button
            className={`btn-primary ${activeView === "adopting" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveView("adopting")}
          >
            Adopter Dashboard
          </button>
          <button
            className={`btn-primary ${activeView === "post" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveView("post")}
          >
            Shelter Dashboard
          </button>
      </div>

      {/* Conditional rendering based on active view */}
      {activeView === "adopting" ? (
        <PetAdopterDashboard />
      ) : (
        <PetPosterDashboard />
      )}
    </>
  );
}
