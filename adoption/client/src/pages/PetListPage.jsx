import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function PetListPage() {
  // State to manage filter values
  const [filters, setFilters] = useState({
    size: "",
    age: "",
    weight: "",
    gender: "",
    activity: "",
    neutered: false,
    specialNeeds: false,
    pottyTrained: false,
    goodWith: [],
  });

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

      {/* Hero Header */}
      <header className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Find your best friend and explore more about our amazing pets</h1>
          <img src="https://i.ytimg.com/vi/fOd16PT1S7A/maxresdefault.jpg" alt="" />
        </div>
      </header>

      {/* Filters Section */}
      <section className="my-5">
        <div className="container">
          <h2 className="mb-4">Filter Pets</h2>
          <form>
            <div className="row">
              {/* Size */}
              <div className="col-md-3">
                <label htmlFor="size" className="form-label">Size</label>
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

              {/* Age */}
              <div className="col-md-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                  value={filters.age}
                  onChange={handleFilterChange}
                  placeholder="Enter age"
                />
              </div>

              {/* Weight */}
              <div className="col-md-3">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="form-control"
                  value={filters.weight}
                  onChange={handleFilterChange}
                  placeholder="Enter weight"
                />
              </div>

              {/* Gender */}
              <div className="col-md-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              {/* Activity Level */}
              <div className="col-md-3 mt-3">
                <label htmlFor="activity" className="form-label">Activity Level</label>
                <select
                  id="activity"
                  name="activity"
                  className="form-select"
                  value={filters.activity}
                  onChange={handleFilterChange}
                >
                  <option value="">Select activity level</option>
                  <option value="indoor">Keep me inside</option>
                  <option value="sleepy">Sleepy</option>
                  <option value="some-exercise">Some exercise</option>
                  <option value="lots-exercise">Lots of exercise</option>
                </select>
              </div>

              {/* Neutered */}
              <div className="col-md-3 mt-3">
                <label htmlFor="neutered" className="form-label">Neutered</label>
                <input
                  type="checkbox"
                  id="neutered"
                  name="neutered"
                  checked={filters.neutered}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
              </div>

              {/* Special Needs */}
              <div className="col-md-3 mt-3">
                <label htmlFor="specialNeeds" className="form-label">Has Special Needs</label>
                <input
                  type="checkbox"
                  id="specialNeeds"
                  name="specialNeeds"
                  checked={filters.specialNeeds}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
              </div>

              {/* Potty Trained */}
              <div className="col-md-3 mt-3">
                <label htmlFor="pottyTrained" className="form-label">Potty Trained</label>
                <input
                  type="checkbox"
                  id="pottyTrained"
                  name="pottyTrained"
                  checked={filters.pottyTrained}
                  onChange={handleFilterChange}
                  className="form-check-input"
                />
              </div>

              {/* Good With */}
              <div className="col-md-3 mt-3">
                <label htmlFor="goodWith" className="form-label">Good With</label>
                <select
                  id="goodWith"
                  name="goodWith"
                  multiple
                  className="form-select"
                  value={filters.goodWith}
                  onChange={handleFilterChange}
                >
                  <option value="cats">Cats</option>
                  <option value="dogs">Dogs</option>
                  <option value="kids">Kids</option>
                  <option value="small-spaces">Small Spaces</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="my-5">
        <div className="container">
          <h2 className="mb-4">Explore Our Pets</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm">
                  <img
                    src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
                    alt="Pet"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Pet Name</h5>
                    <p className="card-text">Quick Facts: Age: 3, Size: Medium, Neutered: Yes</p>
                    <p className="card-text">This is a lovely pet who loves to play and get lots of attention!</p>
                    <Link to="/petdetails" className="btn btn-primary w-100">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
