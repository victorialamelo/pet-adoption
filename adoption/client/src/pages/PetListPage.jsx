import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function PetListPage() {
  const [filters, setFilters] = useState({
    animal_type: "",
    size: "",
    weight: "",
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
    // fetch pets from the database; convert filters into a query string
    const fetchPets = async () => {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== "" && value !== false) acc[key] = value;
            return acc;
          }, {})
        );
        // fetch filtered pet data from API
        const response = await fetch(`/api/pets?${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch pets");

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [filters]); // fetch pets when filters change

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value, // [name] is the name of the input (e.g. gender). If the input is a checkbox, we set the filter value to 'checked' property; otherwise, we use the value property (eg. for dropdowns)
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
              <div className="col-md-6 mb-3">
                <label htmlFor="animal_type" className="form-label">
                  Animal Type
                </label>
                <select
                  id="animal_type"
                  name="animal_type"
                  className="form-select"
                  value={filters.animal_type}
                  onChange={handleFilterChange}
                >
                  <option value="">Select type</option>
                  <option value="dog">Cat</option>
                  <option value="cat">Dog</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Female</option>
                  <option value="female">Male</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div className="col-md-6 mt-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  className="form-select"
                  value={filters.size}
                  onChange={handleFilterChange}
                >
                  <option value="">Select size</option>
                  <option value="extra-small">Extra Small</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              {/* Activity Level Filter */}
              <div className="col-md-6 mt-3">
                <label htmlFor="activity_level" className="form-label">
                  Activity Level
                </label>
                <select
                  id="activity_level"
                  name="activity_level"
                  className="form-select"
                  value={filters.activity_level}
                  onChange={handleFilterChange}
                >
                  <option value="">Select activity level</option>
                  <option value="indoor">Keep me inside</option>
                  <option value="sleepy">Sleepy</option>
                  <option value="some-exercise">Some exercise</option>
                  <option value="lots-exercise">Lots of exercise</option>
                </select>
              </div>

              <div className="col-md-6 mt-3">
                <h4 className="mt-3">Care & Behavior</h4>
                <label htmlFor="has_special_needs" className="form-label mt-3">
                  Has Special Needs
                </label>
                <input
                  type="checkbox"
                  id="has_special_needs"
                  name="has_special_needs"
                  checked={filters.has_special_needs}
                  onChange={handleFilterChange}
                  className="form-check-input mt-3"
                />
                <hr />
                <label htmlFor="potty_trained" className="form-label">
                  Potty Trained
                </label>
                <input
                  type="checkbox"
                  id="potty_trained"
                  name="potty_trained"
                  checked={filters.potty_trained}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
                <hr />
                <label htmlFor="neutered" className="form-label">
                  Neutered
                </label>
                <input
                  type="checkbox"
                  id="neutered"
                  name="neutered"
                  checked={filters.neutered}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
              </div>

              <div className="col-md-6 mt-3">
                <h4 className="mt-3">The pet is good with:</h4>
                <label htmlFor="good_with_cats" className="form-label mt-3">
                  Other Cats
                </label>
                <input
                  type="checkbox"
                  id="good_with_cats"
                  name="good_with_cats"
                  checked={filters.good_with_cats}
                  onChange={handleFilterChange}
                  className="form-check-input mt-3"
                />
                <hr />
                <label htmlFor="good_with_dogs" className="form-label">
                  Other Dogs
                </label>
                <input
                  type="checkbox"
                  id="good_with_dogs"
                  name="good_with_dogs"
                  checked={filters.good_with_dogs}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
                <hr />
                <label htmlFor="good_with_kids" className="form-label">
                  Kids
                </label>
                <input
                  type="checkbox"
                  id="good_with_kids"
                  name="good_with_kids"
                  checked={filters.good_with_kids}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
                <hr />
                <label htmlFor="good_with_smallspaces" className="form-label">
                  Small Spaces
                </label>
                <input
                  type="checkbox"
                  id="good_with_smallspaces"
                  name="good_with_smallspaces"
                  checked={filters.good_with_smallspaces}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
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
                <div key={pet.id} className="col">
                  <div className="card shadow-sm">
                    <img
                      src={
                        pet.image || // pet image placeholder
                        "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
                      }
                      alt={pet.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pet.name}</h5>
                      <Link
                        to={`/petdetails/${pet.id}`}
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
