import { useState } from "react";
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

  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="Hero" />
      </header>

      {/* Dashboard View Toggle */}
      <section className="row">
        <h1>Dashboard</h1>
          <button
            className={`btn ${activeView === "adopt" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveView("adopt")}
          >
            Adopt a Pet
          </button>

          <button
            className={`btn ${activeView === "post" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveView("post")}
          >
            Post a Pet
          </button>

      </section>

      {/* Conditional rendering based on active view */}
      {activeView === "adopt" ? (
        <PetAdopterDashboard />
      ) : (
        <PetPosterDashboard />
      )}
    </>
  );
}
