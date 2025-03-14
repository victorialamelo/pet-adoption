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

      if (storedToken && storedUser) {
        setToken(storedToken); // No need to parse, it's a string
        setUser(JSON.parse(storedUser)); // Parse only if it exists
      }
    } catch (error) {
      console.error("Error retrieving auth data:", error);
    }
  }, []);

  // Function to handle login
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken); // Store token as plain string
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
