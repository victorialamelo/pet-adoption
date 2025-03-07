import React, { useState } from "react";
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
                    src="data:image/jpeg;base64,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"
                    alt="Pet"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Pet Name</h5>
                    <p className="card-text">Quick Facts: Age: 3, Size: Medium, Neutered: Yes</p>
                    <p className="card-text">This is a lovely pet who loves to play and get lots of attention!</p>
                    <Link to="/pet-details" className="btn btn-primary w-100">
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
