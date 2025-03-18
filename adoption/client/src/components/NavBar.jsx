import { useAuth } from "../AuthContext";
import { Link  } from 'react-router-dom';

function Navbar() {
  const { user, token, logout } = useAuth();
  // console.log("NAV BARRRRRRR id", id);
  // console.log("NAV BARRRRRRR user", user);
  // console.log("NAV BARRRRRRR user.user_id", user.user.user_id);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Peluditos</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/petlist">Adopt a Friend</Link>
            </li>
            {token && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/postpet">Post a Friend</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={`/userdashboard`}>Pet Dashboard</Link>
            </li>
            </>
            )}
            {/* IF USER IS LOGGED IN DONT SHOW THIS */}
            {!token && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Log In</Link>
            </li>
            </>
            )}
            {token && (
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
