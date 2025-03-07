import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">pet adoption</Link>
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
              <Link className="nav-link" to="/signup">sign up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/petlist">adopt a pet</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/postpet">post a pet</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => console.log("logout")}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
