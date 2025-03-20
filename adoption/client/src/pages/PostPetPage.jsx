import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../AuthContext";
import { backendAddPostPet } from "../backend";
import { useState } from "react";

export default function PostPetPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  // REDIRECT IF USER NOT AUTHENTICATED
  if (!user) {
    console.error("User not authenticated");
    navigate("/login");
    return;
  }

  // POST A PET
  const createPet = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newPet = {
      name: formData.get("name"),
      animal_type: formData.get("animaltype"),
      weight: Number(formData.get("weight")),
      size: formData.get("size"),
      gender: formData.get("gender"),
      activity_level: formData.get("activity"),
      neutered: formData.get("neutered") ? 1 : 0,
      has_special_needs: formData.get("specialNeeds") ? 1 : 0,
      potty_trained: formData.get("pottyTrained") ? 1 : 0,
      pet_description: formData.get("story"),
      good_with_cats: formData.get("goodwithcats") ? 1 : 0,
      good_with_dogs: formData.get("goodwithdogs") ? 1 : 0,
      good_with_kids: formData.get("goodwithkids") ? 1 : 0,
      good_with_smallspaces: formData.get("goodwithsmallspaces") ? 1 : 0,
      photo: photo,
    };

    try {
      const addedPet = await backendAddPostPet(newPet);
      console.log(addedPet.message);
      navigate(`/petdetails/${addedPet.pet_id}`);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  // FILE UPLOAD HANDLER
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); // store file for submission
  };

  return (
    <>
      <section className="postapet mt-10">
        <div className="container">

          <h1 className="display-4 text-center mb-4">
            Post a Pet for Adoption
          </h1>

          <form className="form-postpet" onSubmit={createPet}>
            <div className="row">
              <div className="col-md-12">

                {/* Pet Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <h4>Pet Name</h4>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                  />
                </div>

                {/* Animal Type */}
                <div className="mb-3">
                  <label htmlFor="animaltype" className="form-label">
                    <h4>Animal Type</h4>
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

                {/* Pet Image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <h4>Pet Image</h4>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="photo"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Pet Story */}
                <div className="mb-3">
                  <label htmlFor="story" className="form-label">
                    <h4>Pet's Story</h4>
                  </label>
                  <textarea
                    className="form-control"
                    id="story"
                    name="story"
                    placeholder="Tell us the story of your pet"
                    rows="4"
                    required
                  />
                </div>

                {/* Weight */}
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">
                    <h4>Weight (kg)</h4>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    required
                  />
                </div>

                {/* Size */}
                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    <h4>Size</h4>
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

                {/* Gender */}
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    <h4>Gender</h4>
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

                {/* Activity Level */}
                <div className="mb-3">
                  <label htmlFor="activity" className="form-label">
                    <h4>Activity Level</h4>
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

                {/* Behavior & Care */}
                <h4 className="mb-3 mt-4">Behavior & Care</h4>

                {/* Neutered */}
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

                {/* Special Needs */}
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

                {/* Potty Trained */}
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

                {/* Good With */}
                <h4 className="mb-3 mt-4">Good With</h4>

                {/* Good With Cats*/}
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

                {/* Good With Dogs */}
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

                {/* Good With Kids */}
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

                {/* Good With Small Spaces */}
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
