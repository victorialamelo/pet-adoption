import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function PetListPage() {
  const [filters, setFilters] = useState({
    animal_type: "",
    size: "",
    gender: "",
    activity_level: "",
    neutered: false,
    has_special_needs: false,
    potty_trained: false,
    good_with_cats: false,
    good_with_dogs: false,
    good_with_kids: false,
    good_with_smallspaces: false,
  });

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Convert filters to query string
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== "" && value !== false) acc[key] = value;
            return acc;
          }, {})
        );

        // Fetch filtered pets from API
        const response = await fetch(
          `http://localhost:5001/pets/pet?${queryParams}`
        );
        if (!response.ok) throw new Error("Failed to fetch pets");
        console.log(response);
        const data = await response.json();
        setPets(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [filters]); // Fetch pets when filters change

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <NavBar />

      <header className="text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Find your best friend</h1>
          <img
            src="https://i.ytimg.com/vi/fOd16PT1S7A/maxresdefault.jpg"
            alt="Hero"
          />
        </div>
      </header>

      <section className="filter">
        <div className="container">
          <h1 className="mb-4">Search Peluditos</h1>
          <form>
            <div className="row">
              {/* Animal Type */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Animal Type</label>
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
                <label className="form-label">Gender</label>
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
                <label className="form-label">Size</label>
                <select
                  name="size"
                  className="form-select"
                  value={filters.size}
                  onChange={handleFilterChange}
                >
                  <option value="">Select size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              {/* Activity Level */}
              <div className="col-md-6 mt-3">
                <label className="form-label">Activity Level</label>
                <select
                  name="activity_level"
                  className="form-select"
                  value={filters.activity_level}
                  onChange={handleFilterChange}
                >
                  <option value="">Select activity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                        checked={filters[key]}
                        onChange={handleFilterChange}
                      />
                      <label className="form-check-label" htmlFor={key}>
                        {key.replace(/_/g, " ")}
                      </label>
                    </div>
                  )
                )}

                {/* Good With Filters */}
                <h4>Good With</h4>
                {["cats", "dogs", "kids", "smallspaces"].map((key) => (
                  <div key={key} className="form-check">
                    <input
                      type="checkbox"
                      id={`good_with_${key}`}
                      name={`good_with_${key}`}
                      className="form-check-input"
                      checked={filters[`good_with_${key}`]}
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
                      className="card-img-top"
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
