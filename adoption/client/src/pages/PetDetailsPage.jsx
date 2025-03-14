import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import {backendFetchPetDetails} from "../backend";

export default function PetDetailsPage() {
  const { pet_id } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`/pets/${pet_id}`);
        if (!response.ok) throw new Error("Failed to fetch pet details");
        const data = await response.json();
        setPetDetails(data);
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
      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="display-4">{petDetails.name}</h2>
              <p className="lead">{petDetails.description}</p>
              <ul className="list-unstyled">
                <li><strong>Size:</strong> {petDetails.size}</li>
                <li><strong>Age:</strong> {petDetails.age} years</li>
                <li><strong>Weight:</strong> {petDetails.weight} kg</li>
                <li><strong>Gender:</strong> {petDetails.gender}</li>
                <li><strong>Activity Level:</strong> {petDetails.activity}</li>
                <li><strong>Neutered:</strong> {petDetails.neutered ? "Yes" : "No"}</li>
                <li><strong>Special Needs:</strong> {petDetails.specialNeeds ? "Yes" : "No"}</li>
                <li><strong>Potty Trained:</strong> {petDetails.pottyTrained ? "Yes" : "No"}</li>
                <li><strong>Good With:</strong> {petDetails.goodWith?.join(", ")}</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
                src={petDetails.image_url || "default-image.jpg"}
                alt={petDetails.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
