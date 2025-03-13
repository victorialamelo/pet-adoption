import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";
import { useAuth } from "../AuthContext";
// import axios from 'axios'

import { backendAddPostPet } from "../backend";

export default function PostPetPage() {
  const { user } = useAuth(); //from AuthContext
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  // const [uploadSuccess, setUploadSuccess] = useState(false);

  const createPet = async (formData) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const newPet = {
      name: formData.get("name"),
      animal_type: formData.get("animaltype"),
      weight: Number(formData.get("weight")), // transform to number due to original string value
      size: formData.get("size"),
      gender: formData.get("gender"),
      activity_level: formData.get("activity"),
      neutered: Number(formData.get("neutered")), // transform to number due to boolean 0 or 1
      has_special_needs: Number(formData.get("specialNeeds")),
      potty_trained: Number(formData.get("pottyTrained")),
      img_url: formData.get("image") || null, // accepts if photo is not uploaded
      pet_description: formData.get("story"),
      good_with_cats: Number(formData.get("goodwithcats")),
      good_with_dogs: Number(formData.get("goodwithdogs")),
      good_with_kids: Number(formData.get("goodwithkids")),
      good_with_smallspaces: Number(formData.get("goodwithsmallspaces")),
    };

    try {
      const addedPet = await backendAddPostPet(user.user_id, newPet); //from Auth Context
      console.log("Pet added:", addedPet); //Debugging

      //redirect ot pet details page
      navigate(`/petdetatils/${addedPet.pet_id}`);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // TODO: create backendCreateUserPet function in backend.js
  //const addedPet = await backendAddPostPet(params.user_id, newPet); // are we using params here? --> send the new object (with all the input for new pet) to backend

  // await backendCreateUserPokemon(user.id, pokebud.pokeid);
  // const { token } = await backendAuthLogin({ email, password });
  // saveSession(token);

  //console.log("Pet added");

  // redirect user to petdetails/pet_id
  //navigate(`/petdetails/${addedPet.pet_id}`);
  //};

  // NOT WORKING
  //const handleFileChange = (e) => {
  //setPhoto(e.target.files[0]);
  //};

  // photo upload need photo filename in the async request NOT WORKING
  //const handleUpload = async () => {
  // Send the form data with the file to the server
  //const formData = new FormData();

  // Add the file to the form data with the key 'photo'
  //formData.append('photo', photo) adds the file (photo)
  //to the form data with the key 'photo'.
  //This key ('photo') should match the field name expected
  //by the server. In our case, it matches the field name 'photo'
  //in the Express route: upload.single('photo').
  //formData.append("photo", photo);
  // try {
  //   const res = await axios.post('/api/photo', formData);
  //   console.log(res);
  //   //show a success notification
  //   setUploadSuccess(true);
  //   setTimeout(() => setUploadSuccess(false), 3000); // Hide notification after 3 seconds
  // } catch (err) {
  //   console.error(err);
  // }
  //};

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/beigekitten.jpg" alt="" />
      </header>

      <section className="postapet mt-10">
        <div className="container">
          <h1 className="display-4 text-center mb-4">
            Post a Pet for Adoption
          </h1>
          <form
            className="form-postpet"
            onSubmit={((e) => e.preventDefault(), createPet())}
          >
            <div className="row">
              {/* Left Column: Pet Details */}
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
                    placeholder="Enter pet's name"
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
                    required
                  >
                    <option value="" disabled selected>
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
                    name="image"
                    onChange={handleFileChange}
                  />
                  <button
                    className="btn btn-primary btn-block mt-3"
                    onClick={handleUpload}
                  >
                    Upload Photo
                  </button>
                </div>

                {/* {uploadSuccess && (
                  <div className="alert alert-success" role="alert">
                    Photo uploaded successfully!
                  </div>
                )} */}

                <div className="mb-3">
                  <label htmlFor="story" className="form-label">
                    Pet's Story
                  </label>
                  <textarea
                    className="form-control"
                    id="story"
                    name="story"
                    rows="6"
                    required
                    placeholder="Tell us the story of your pet"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    required
                    placeholder="Enter pet's age"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    required
                  >
                    <option value="" disabled selected>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
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
                    placeholder="Enter pet's weight"
                  />
                </div>
              </div>

              {/* Right Column: Pet's Story, Image, and Boolean Inputs */}
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    Size
                  </label>
                  <select className="form-select" id="size" name="size">
                    <option value="" disabled selected>
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
                  <label htmlFor="activity" className="form-label">
                    Activity Level
                  </label>
                  <select className="form-select" id="activity" name="activity">
                    <option value="" disabled selected>
                      Select activity level
                    </option>
                    <option value="keep me inside">Keep Me Inside</option>
                    <option value="sleepy">Sleepy</option>
                    <option value="some exercise">Some Exercise</option>
                    <option value="lots of exercise">Lots of Exercise</option>
                  </select>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">
                    Is the pet neutered?
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="neutered"
                    name="neutered"
                    required
                  />
                  <label
                    htmlFor="neutered"
                    className="form-label checkbox-label"
                  >
                    Neutered
                  </label>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">
                    Does the pet have special needs?
                  </span>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="specialNeeds"
                    name="specialNeeds"
                  />
                  <label
                    htmlFor="specialNeeds"
                    className="form-label checkbox-label"
                  >
                    Special Needs
                  </label>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">
                    Is the pet potty trained?
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="pottyTrained"
                    name="pottyTrained"
                  />
                  <label
                    htmlFor="pottyTrained"
                    className="form-label checkbox-label"
                  >
                    {" "}
                    Potty Trained
                  </label>
                </div>

                <hr />

                <div className="mb-3">
                  <span className="ms-2 checkbox-span">
                    This pet is good with...
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="goodwithcats"
                    name="goodwithcats"
                  />
                  <label
                    htmlFor="goodwithcats"
                    className="form-label checkbox-label"
                  >
                    Other Cats
                  </label>
                </div>
                <div className="mb-3">
                  <span className="ms-2 checkbox-span"></span>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="goodwithdogs"
                    name="goodwithdogs"
                  />
                  <label
                    htmlFor="goodwithdogs"
                    className="form-label checkbox-label"
                  >
                    Other Dogs
                  </label>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span"></span>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="goodwithkids"
                    name="goodwithkids"
                  />
                  <label
                    htmlFor="goodwithkids"
                    className="form-label checkbox-label"
                  >
                    Kids
                  </label>
                </div>

                <div className="mb-3">
                  <span className="ms-2 checkbox-span"></span>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="goodwithsmallspaces"
                    name="goodwithsmallspaces"
                  />
                  <label
                    htmlFor="goodwithsmallspaces"
                    className="form-label checkbox-label"
                  >
                    Small Spaces
                  </label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
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
