import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { backendFetchPetDetails } from "../backend";
import { useAuth } from "../AuthContext";

export default function PetDetailsPage() {
  const { user } = useAuth();
  const { pet_id } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const fetchedPetData = await backendFetchPetDetails(pet_id);
        console.log("FETCH PET DETAILS data", fetchedPetData[0]);
        const petData = fetchedPetData[0];

        const processedPetDetails = {
          ...petData,
          neutered: Boolean(petData.neutered),
          has_special_needs: Boolean(petData.has_special_needs),
          potty_trained: Boolean(petData.potty_trained),
          goodWith: [
            petData.good_with_cats ? "Cats" : null,
            petData.good_with_dogs ? "Dogs" : null,
            petData.good_with_kids ? "Kids" : null,
            petData.good_with_smallspaces ? "Small Spaces" : null,
          ].filter(Boolean),
        };
        console.log("processedPetDetails", processedPetDetails)
        setPetDetails(processedPetDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [pet_id]);

  if (loading) return <p>Loading pet details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!petDetails) return <p>Pet not found.</p>;

  return (
    <>
      <NavBar />
      <header>
        <img src="../src/assets/beigekitten.jpg" alt="Pet Banner" />
      </header>
      <section className="mb-10">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="display-4">{petDetails.name}</h2>
              <p className="lead">{petDetails.pet_description}</p>
              <ul className="list-unstyled">
                <li><strong>Size:</strong> {petDetails.size}</li>
                <li><strong>Weight:</strong> {petDetails.weight} kg</li>
                <li><strong>Gender:</strong> {petDetails.gender}</li>
                <li><strong>Activity Level:</strong> {petDetails.activity_level}</li>
                <li><strong>Neutered:</strong> {petDetails.neutered ? "Yes" : "No"}</li>
                <li><strong>Special Needs:</strong> {petDetails.specialNeeds ? "Yes" : "No"}</li>
                <li><strong>Potty Trained:</strong> {petDetails.pottyTrained ? "Yes" : "No"}</li>
                {petDetails.goodWith.length > 0 && (
                <li><strong>Good With:</strong> {petDetails.goodWith.join(", ")}</li>
              )}
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src={petDetails.image_url || "../src/assets/bluedog.jpg"}
                alt={petDetails.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
      {user && (
        <section className="mb-10">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="display-4">ASK ABOUT {petDetails.name}</h2>
                <p className="lead">{petDetails.pet_description}</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Write your message to the pet's owner... hi.. I want to adopt"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Request</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
