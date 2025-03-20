import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NotFound from "./pages/NotFound";

import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PetListPage from "./pages/PetListPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import PostPetPage from "./pages/PostPetPage";
import UserDashboard from "./pages/UserDashboard";
import AboutUsPage from "./pages/AboutUsPage";
import FaqsPage from "./pages/FaqsPage";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/petlist" element={<PetListPage />} />
        <Route path="/petdetails/:pet_id" element={<PetDetailsPage />} />
        <Route path="/postpet" element={<PostPetPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
