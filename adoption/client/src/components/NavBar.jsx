import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Peluditos
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faqs">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/petlist">
                Adopt a Friend
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/postpet">
                    Post a Friend
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/userdashboard`}>
                    Pet Dashboard
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  Log Out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
