import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
          console.log("✅ User ID:", parsedUser);
        } catch (error) {
          console.error("❌ Error parsing user from localStorage:", error);
        }
      } else {
        console.log("⚠️ No user logged in");
      }
    } catch (error) {
      console.error("❌ Error retrieving auth data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to handle login
  const login = (userData, authToken) => {
    console.log("🔑 Attempting login...");

    setUser(userData);
    setToken(authToken);

    // Store in localStorage - stringify the userData object
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    console.log("✅ User:", localStorage.getItem("user"));
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    console.log("✅ Logged Out");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
