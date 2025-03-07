import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function PetDetailsPage() {
  // State to manage pending requests (if you're the poster)
  const [isPoster, setIsPoster] = useState(true); // Check if the logged-in user is the poster
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, user: "User 1", status: "Applied", date: "2025-03-01", message: "I'm interested in adopting Buddy!" },
    { id: 2, user: "User 2", status: "Pending Approval", date: "2025-03-02", message: "Buddy seems like a great fit for my family!" },
    { id: 3, user: "User 3", status: "Adoption in Progress", date: "2025-03-03", message: "I'm excited to meet Buddy!" },
  ]);

  const [applicationMessage, setApplicationMessage] = useState("");
  const [filters, setFilters] = useState({
    size: "medium",
    age: 2,
    weight: 5,
    gender: "male",
    activity: "some exercise",
    neutered: true,
    specialNeeds: false,
    pottyTrained: true,
    goodWith: ["dogs", "cats"],
  });

  // Handle message and application submission
  const handleMessageChange = (e) => setApplicationMessage(e.target.value);

  const handleApply = () => {
    // Handle message submission (you can send it to a backend or state here)
    alert("Message sent to the poster!");
  };

  const handleStatusChange = (requestId, newStatus) => {
    // Update status for pending request
    setPendingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

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

      {/* Pet Details Section */}
      <section className="my-5">
        <div className="container">
          <div className="row">
            {/* Left Column: Pet Details */}
            <div className="col-md-6">
              <h2 className="display-4">Buddy</h2>
              <p className="lead">Buddy is a friendly and playful dog who loves to explore and cuddle. She's 2 years old and enjoys the outdoors.</p>

              {/* Filters Section (Details of the pet) */}
              <div className="mb-4">
                <h5>Details:</h5>
                <ul className="list-unstyled">
                  <li><strong>Size:</strong> {filters.size}</li>
                  <li><strong>Age:</strong> {filters.age} years</li>
                  <li><strong>Weight:</strong> {filters.weight} kg</li>
                  <li><strong>Gender:</strong> {filters.gender}</li>
                  <li><strong>Activity Level:</strong> {filters.activity}</li>
                  <li><strong>Neutered:</strong> {filters.neutered ? "Yes" : "No"}</li>
                  <li><strong>Special Needs:</strong> {filters.specialNeeds ? "Yes" : "No"}</li>
                  <li><strong>Potty Trained:</strong> {filters.pottyTrained ? "Yes" : "No"}</li>
                  <li><strong>Good With:</strong> {filters.goodWith.join(", ")}</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Pet Image */}
            <div className="col-md-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1661892088256-0a17130b3d0d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHVwcHl8ZW58MHx8MHx8fDA%3D"
                alt="Buddy"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="my-5">
        <div className="container">
          <div className="row">
            {/* Left Column: Message to Poster */}
            <div className="col-md-6">
              <h3>Send a Message to the Poster</h3>
              <textarea
                className="form-control"
                rows="5"
                value={applicationMessage}
                onChange={handleMessageChange}
                placeholder="Write your message or ask a question..."
              />
              <button className="btn btn-primary mt-3" onClick={handleApply}>
                Apply or Ask a Question
              </button>
            </div>

            {/* Right Column: Pending Requests (Dashboard for Poster) */}
            {isPoster && (
              <div className="col-md-6">
                <h3>Pending Requests</h3>
                <ul className="list-group">
                  {pendingRequests.map((request) => (
                    <li key={request.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{request.user} - {request.status} (Applied on: {request.date})</span>
                        <div className="d-flex">
                          <select
                            className="form-select me-2"
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Adoption in Progress">Adoption in Progress</option>
                            <option value="Adopted">Adopted</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-2"><strong>Message:</strong> {request.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
