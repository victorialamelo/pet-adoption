import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";
import { useAuth } from "../AuthContext";
import { backendAddPostPet } from "../backend";
import { useState } from "react";

export default function PostPetPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  const createPet = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const formData = new FormData(event.target);

    const newPet = {
      name: formData.get("name"),
      animal_type: formData.get("animaltype"),
      weight: Number(formData.get("weight")),
      size: formData.get("size"),
      gender: formData.get("gender"),
      activity_level: formData.get("activity"),
      neutered: Number(formData.get("neutered")) || 0,
      has_special_needs: Number(formData.get("specialNeeds")) || 0,
      potty_trained: Number(formData.get("pottyTrained")) || 0,
      pet_description: formData.get("story"),
      good_with_cats: Number(formData.get("goodwithcats")) || 0,
      good_with_dogs: Number(formData.get("goodwithdogs")) || 0,
      good_with_kids: Number(formData.get("goodwithkids")) || 0,
      good_with_smallspaces: Number(formData.get("goodwithsmallspaces")) || 0,
      photo: photo, // Include the file directly
    };

    try {
      const addedPet = await backendAddPostPet(newPet);
      console.log("Pet added:", addedPet);
      navigate(`/petdetails/${addedPet.pet_id}`);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // store file for submission
  };

  return (
    <>
      <NavBar />
      <section className="postapet mt-10">
        <div className="container">
          <h1 className="display-4 text-center mb-4">
            Post a Pet for Adoption
          </h1>
          <form className="form-postpet" onSubmit={createPet}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="animaltype" className="form-label">
                    Animal Type
                  </label>
                  <select
                    className="form-select"
                    id="animaltype"
                    name="animaltype"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select animal type
                    </option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Pet Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="photo"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="story" className="form-label">
                    Pet's Story
                  </label>
                  <textarea
                    className="form-control"
                    id="story"
                    name="story"
                    rows="4"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    Size
                  </label>
                  <select
                    className="form-select"
                    id="size"
                    name="size"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select animal size
                    </option>
                    <option value="extra small">Extra Small</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra large">Extra Large</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="activity" className="form-label">
                    Activity Level
                  </label>
                  <select
                    className="form-select"
                    id="activity"
                    name="activity"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select activity level
                    </option>
                    <option value="keep me inside">Keep Me Inside</option>
                    <option value="some exercise">Some Exercise</option>
                    <option value="lots of exercise">Lots of Exercise</option>
                  </select>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="neutered"
                    name="neutered"
                  />
                  <label className="form-check-label" htmlFor="neutered">
                    Neutered
                  </label>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="specialNeeds"
                    name="specialNeeds"
                  />
                  <label className="form-check-label" htmlFor="specialNeeds">
                    Special Needs
                  </label>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="pottyTrained"
                    name="pottyTrained"
                  />
                  <label className="form-check-label" htmlFor="pottyTrained">
                    Potty Trained
                  </label>
                </div>

                <hr />

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="goodwithcats"
                    name="goodwithcats"
                  />
                  <label className="form-check-label" htmlFor="goodwithcats">
                    Good with Cats
                  </label>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="goodwithdogs"
                    name="goodwithdogs"
                  />
                  <label className="form-check-label" htmlFor="goodwithdogs">
                    Good with Dogs
                  </label>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="goodwithkids"
                    name="goodwithkids"
                  />
                  <label className="form-check-label" htmlFor="goodwithkids">
                    Good with Kids
                  </label>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="goodwithsmallspaces"
                    name="goodwithsmallspaces"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="goodwithsmallspaces"
                  >
                    Good with Small Spaces
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Post Pet
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
