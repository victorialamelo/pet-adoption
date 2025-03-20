import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//import NavBar from "../components/NavBar";
import { backendFetchPetDetails } from "../backend";
import { useAuth } from "../AuthContext";
import EditPetDetails from "../components/EditPetDetails";
import { useNavigate } from "react-router-dom";
// import { createAdoptionRequest } from "./adrequestfuncs";

export default function PetDetailsPage() {
  const { user } = useAuth();
  const { pet_id } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const fetchedPetData = await backendFetchPetDetails(pet_id);
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
        setPetDetails(processedPetDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [pet_id, updateSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestMessage = e.target.message.value;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found! User is not authenticated.");
      alert("You must be logged in to submit an adoption request.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/requests/adopt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          pet_id: petDetails?.pet_id,
          request_message: requestMessage
        }),
      });

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        alert(`Failed to submit adoption request: ${data.message}`);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const navigateToDashboard = () => {
    navigate("/userdashboard");
  };

  if (loading) return <p>Loading pet details...</p>;
  if (error) {
    navigate("/login");
  }
  if (!petDetails) return <p>Pet not found.</p>;

  return (
    <>

      {/* Adoption Request Sent Success */}
      {showSuccessModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success!</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Your adoption request for {petDetails.name} has been submitted successfully!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={navigateToDashboard}>
                  View My Requests
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Pet Profile */}
      <section className="mb-10">
        <div className="container">
          <div className="row">

            {/* Pet Name & Details */}
            <div className="col-md-6">
              <h2 className="display-4">{petDetails.name}</h2>
              <p className="lead">{petDetails.pet_description}</p>
              <ul className="list-unstyled">
                <li>
                  <strong>Animal Type:</strong> {petDetails.animal_type}
                </li>
                <li>
                  <strong>Size:</strong> {petDetails.size}
                </li>
                <li>
                  <strong>Weight:</strong> {petDetails.weight} kg
                </li>
                <li>
                  <strong>Gender:</strong> {petDetails.gender}
                </li>
                <li>
                  <strong>Activity Level:</strong> {petDetails.activity_level}
                </li>
                <li>
                  <strong>Neutered:</strong>{" "}
                  {petDetails.neutered ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Special Needs:</strong>{" "}
                  {petDetails.has_special_needs ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Potty Trained:</strong>{" "}
                  {petDetails.potty_trained ? "Yes" : "No"}
                </li>
                {petDetails.goodWith.length > 0 && (
                  <li>
                    <strong>Good With:</strong> {petDetails.goodWith.join(", ")}
                  </li>
                )}
              </ul>
              {user && user === petDetails.user_id && (
                <EditPetDetails
                  petId={petDetails.pet_id}
                  onSuccess={(updatedPet) => {
                    console.log(updatedPet.message);
                    setUpdateSuccess(prev => !prev);
                  }}
                />
              )}
            </div>

            {/* Pet Image */}
            <div className="col-md-6">
              <img
                src={petDetails.img_url || "https://via.placeholder.com/150"}
                alt={petDetails.name}
                className="img-fluid pet-detail-image"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Adoption Request */}
      {user !== petDetails.user_id && (
        <section className="mb-10 pet-details">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="display-4">ASK ABOUT {petDetails.name}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Your Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Write your message to the pet's owner..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
