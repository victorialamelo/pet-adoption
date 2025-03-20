import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
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

  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <NavBar />


        <PetAdopterDashboard />

        <PetPosterDashboard />

    </>
  );
}
