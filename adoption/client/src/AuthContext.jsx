import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check localStorage on first load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) setToken(storedToken);

      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log("✅ User set in state:", parsedUser);
        } catch (error) {
          console.error("❌ Error parsing user from localStorage:", error);
        }
      } else {
        console.log("⚠️ No user logged in");
      }
    } catch (error) {
      console.error("❌ Error retrieving auth data:", error);
    }
  }, []);

  // Function to handle login
  const login = (userData, authToken) => {
    if (!userData || typeof userData !== "object") {
      console.error("❌ Invalid userData provided, not saving to localStorage.");
      return;
    }

    setUser(userData);
    setToken(authToken);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    console.log("✅ Stored in localStorage - User:", userData);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
