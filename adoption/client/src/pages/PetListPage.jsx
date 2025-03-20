import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";
import { useAuth } from "../AuthContext";

export default function PetListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    animal_type: "",
    size: "",
    gender: "",
    activity_level: "",
    neutered: 0,
    has_special_needs: 0,
    potty_trained: 0,
    good_with_cats: 0,
    good_with_dogs: 0,
    good_with_kids: 0,
    good_with_smallspaces: 0,
  });

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Convert filters to query string
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            // Only add parameters with non-falsy values (including '0' for unchecked checkboxes)
            if (value !== "" && value !== 0) acc[key] = value;
            return acc;
          }, {})
        );

        // Fetch filtered pets from API
        const response = await fetch(
          `http://localhost:5001/pets/pet?${queryParams}`
        );
        if (!response.ok) throw new Error("Failed to fetch pets");
        const data = await response.json();

        // Check if the response data is an array
        if (Array.isArray(data)) {
          setPets(data); // Set pets if the data is an array
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [filters]); // fetch pets when filters change

  const handleFilterChange = (e) => {
    const { name, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value, // set 1 for checked, 0 for unchecked
    }));
  };

  const handleSaveSearch = async () => {
    // Redirect to login if user is not authenticated
    if (!user) {
      navigate("/login", { state: { from: "/petlist" } });
      return;
    }

    const queryParams = new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "" && value !== 0) acc[key] = value;
        return acc;
      }, {})
    ).toString();

    const searchName = prompt("Enter a name for this search:");

    if (!searchName) return;

    try {
      // Make sure to include authentication token in headers if required
      const response = await fetch("http://localhost:5001/savedSearches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // If you're using JWT tokens
        },
        body: JSON.stringify({
          search_name: searchName,
          search_query: queryParams,
        }),
      });

      if (!response.ok) throw new Error("Failed to save search");

      alert("Search saved successfully!");
    } catch (error) {
      console.error("Error saving search:", error);
      alert("Failed to save search. Please try again.");
    }
  };

  return (
    <>
      <NavBar />

      <header className="header-petlist">
        <div className="container">
          <h1 className="display-4 fw-bold h1-petlist">
            Find your best friend
          </h1>
        </div>
      </header>

      <section className="filter">
        <div className="container">
          <h1 className="mb-4">Search Peluditos</h1>
          <form>
            <div className="row">
              {/* Animal Type */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <h4>Animal Type</h4>
                </label>
                <select
                  name="animal_type"
                  className="form-select"
                  value={filters.animal_type}
                  onChange={handleFilterChange}
                >
                  <option value="">Select type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <label className="form-label">
                  <h4>Gender</h4>
                </label>
                <select
                  name="gender"
                  className="form-select"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Size */}
              <div className="col-md-6 mt-3">
                <label className="form-label">
                  <h4>Size</h4>
                </label>
                <select
                  name="size"
                  className="form-select"
                  value={filters.size}
                  onChange={handleFilterChange}
                >
                  <option value="">Select size</option>
                  <option value="extra small">Extra Small</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra large">Extra Large</option>
                </select>
              </div>

              {/* Activity Level */}
              <div className="col-md-6 mt-3">
                <label className="form-label">
                  <h4>Activity Level</h4>
                </label>
                <select
                  name="activity_level"
                  className="form-select"
                  value={filters.activity_level}
                  onChange={handleFilterChange}
                >
                  <option value="">Select activity</option>
                  <option value="keep me inside">Keep Me Inside</option>
                  <option value="some exercise">Some Exercise</option>
                  <option value="lots of exercise">Lots of Exercise</option>
                </select>
              </div>

              {/* Behavior Filters */}
              <div className="col-md-6 mt-3">
                <h4>Behavior & Care</h4>
                {["neutered", "has_special_needs", "potty_trained"].map(
                  (key) => (
                    <div key={key} className="form-check">
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        className="form-check-input"
                        checked={filters[key] === 1}
                        onChange={handleFilterChange}
                      />
                      <label className="form-check-label" htmlFor={key}>
                        {key.replace(/_/g, " ")}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="col-md-6 mt-3">
                {/* Good With Filters */}
                <h4>Good With</h4>
                {["cats", "dogs", "kids", "smallspaces"].map((key) => (
                  <div key={key} className="form-check">
                    <input
                      type="checkbox"
                      id={`good_with_${key}`}
                      name={`good_with_${key}`}
                      className="form-check-input"
                      checked={filters[`good_with_${key}`] === 1}
                      onChange={handleFilterChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`good_with_${key}`}
                    >
                      Good with {key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        {user ? (
          <button
            onClick={handleSaveSearch}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              backgroundColor: "#2a2a6a",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              paddingTop: "10px",
            }}
          >
            Save Search to Dashboard
          </button>
        ) : (
          <p className="mt-3 text-muted">
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Log in
            </Link>{" "}
            to save your search criteria
          </p>
        )}
      </section>

      {/* Pet Grid */}
      <section className="petgrid">
        <div className="container">
          <h1 className="mb-4">Explore Our Peluditos</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {pets.length === 0 ? (
              <p>No pets found matching your criteria.</p>
            ) : (
              pets.map((pet) => (
                <div key={pet.pet_id} className="col">
                  <div className="card shadow-sm">
                    <img
                      src={pet.img_url || "https://via.placeholder.com/150"}
                      alt={pet.name}
                      className="card-img-top pet-card-image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pet.name}</h5>
                      <Link
                        to={`/petdetails/${pet.pet_id}`}
                        className="btn btn-primary w-100"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
