import { useAuth } from "../AuthContext";
import { Link, useParams } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const { id } = useParams();

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
              <Link className="nav-link" to="/signup">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/petlist">Adopt a Friend</Link>
            </li>
            {user && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/postpet">Post a Friend</Link>
            </li>
            <li className="nav-item">
          <Link className="nav-link" to={`/userdashboard/${id ? id : user.user_id}`}>Pet Dashboard</Link>
            </li>
            </>
            )}
            {/* IF USER IS LOGGED IN DONT SHOW THIS */}
            {!user && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Log In</Link>
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
