import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PetListPage from "./pages/PetListPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import PostPetPage from "./pages/PostPetPage";
import UserDashboard from "./pages/UserDashboard";
import "./App.css";


export default function App() {

  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/petlist" element={<PetListPage />} />
          <Route path="/petdetails" element={<PetDetailsPage />} />
          <Route path="/postpet" element={<PostPetPage />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
    </AuthProvider>
  );
}
