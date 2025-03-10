import { useState } from "react";
import { Link } from 'react-router';
import NavBar from '../components/NavBar'
import "../App.css"

export default function PostPetPage() {
  const [petDetails, setPetDetails] = useState({
    name: "",
    size: "medium",
    age: "",
    weight: "",
    gender: "male",
    activity: "some exercise",
    neutered: false,
    specialNeeds: false,
    pottyTrained: false,
    goodWith: [],
    story: "",
    image: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoodWithChange = (e) => {
    const { value, checked } = e.target;
    setPetDetails((prevDetails) => {
      const newGoodWith = checked
        ? [...prevDetails.goodWith, value]
        : prevDetails.goodWith.filter((item) => item !== value);
      return { ...prevDetails, goodWith: newGoodWith };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save the pet details)
    alert("Pet posted successfully!");
  };

return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/beigekitten.jpg" alt="" />
      </header>

      <section className="postapet mt-10">
        <div className="container">
          <h1 className="display-4 text-center mb-4">Post a Pet for Adoption</h1>
          <form className="form-postpet" onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column: Pet Details */}
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Pet Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter pet's name"
                    value={petDetails.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Pet Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="story" className="form-label">Pet's Story</label>
                  <textarea
                    className="form-control"
                    id="story"
                    name="story"
                    rows="6"
                    value={petDetails.story}
                    onChange={handleChange}
                    placeholder="Tell us the story of your pet"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age (years)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    value={petDetails.age}
                    onChange={handleChange}
                    placeholder="Enter pet's age"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={petDetails.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={petDetails.weight}
                    onChange={handleChange}
                    placeholder="Enter pet's weight"
                  />
                </div>

              </div>

              {/* Right Column: Pet's Story, Image, and Boolean Inputs */}
              <div className="col-md-12">
              <div className="mb-3">
                  <label htmlFor="size" className="form-label">Size</label>
                  <select
                    className="form-select"
                    id="size"
                    name="size"
                    value={petDetails.size}
                    onChange={handleChange}
                  >
                    <option value="extra small">Extra Small</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra large">Extra Large</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="activity" className="form-label">Activity Level</label>
                  <select
                    className="form-select"
                    id="activity"
                    name="activity"
                    value={petDetails.activity}
                    onChange={handleChange}
                  >
                    <option value="keep me inside">Keep Me Inside</option>
                    <option value="sleepy">Sleepy</option>
                    <option value="some exercise">Some Exercise</option>
                    <option value="lots of exercise">Lots of Exercise</option>
                  </select>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">Is the pet neutered?</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="neutered"
                    name="neutered"
                    checked={petDetails.neutered}
                    onChange={handleChange}
                  />
                  <label htmlFor="neutered" className="form-label checkbox-label">Neutered</label>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">Does the pet have special needs?</span>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="specialNeeds"
                    name="specialNeeds"
                    checked={petDetails.specialNeeds}
                    onChange={handleChange}
                  />
                  <label htmlFor="specialNeeds" className="form-label checkbox-label">Special Needs</label>
                </div>

                <div className="mb-3">
                <span className="ms-2 checkbox-span">Is the pet potty trained?</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="pottyTrained"
                    name="pottyTrained"
                    checked={petDetails.pottyTrained}
                    onChange={handleChange}
                  />
                  <label htmlFor="pottyTrained" className="form-label checkbox-label"> Potty Trained</label>
                </div>

                <hr />

                <div className="mb-3">
                  <label className="form-label">Good With</label>
                  <div>
                    <input
                      type="checkbox"
                      id="goodWithCats"
                      value="cats"
                      checked={petDetails.goodWith.includes("cats")}
                      onChange={handleGoodWithChange}
                    />
                    <label htmlFor="goodWithCats" className="ms-2">Cats</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="goodWithDogs"
                      value="dogs"
                      checked={petDetails.goodWith.includes("dogs")}
                      onChange={handleGoodWithChange}
                    />
                    <label htmlFor="goodWithDogs" className="ms-2">Dogs</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="goodWithKids"
                      value="kids"
                      checked={petDetails.goodWith.includes("kids")}
                      onChange={handleGoodWithChange}
                    />
                    <label htmlFor="goodWithKids" className="ms-2">Kids</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="goodWithSmallSpaces"
                      value="small spaces"
                      checked={petDetails.goodWith.includes("small spaces")}
                      onChange={handleGoodWithChange}
                    />
                    <label htmlFor="goodWithSmallSpaces" className="ms-2">Small Spaces</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Post Pet</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
