import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { fetchUserProfile } from "../backend";
import ProfileSection from "./ProfileSection";

export default function PetAdopterDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
  });
  const [savedSearches, setSavedSearches] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // profile, searches, applications

  // Fetch user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchUserProfile(user);
        const userData = response;

        setProfile({
          name: userData.user_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          about: userData.about || "",
        });

        // Fetch saved searches from API
        await fetchSavedSearches();

        // For applications, still using dummy data for now
        setApplications([
          {
            id: 101,
            petName: "Buddy",
            petImage: "../src/assets/dogsvg.svg",
            shelterName: "Happy Paws",
            status: "Pending",
            appliedDate: "2023-11-15",
          },
          {
            id: 102,
            petName: "Whiskers",
            petImage: "../src/assets/dogsvg.svg",
            shelterName: "Furry Friends",
            status: "Approved",
            appliedDate: "2023-11-10",
          },
        ]);
      } catch (err) {
        console.error("Error fetching adopter profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  // Function to fetch saved searches
  const fetchSavedSearches = async () => {
    try {
      const response = await fetch("http://localhost:5001/savedSearches", {
        headers: {
          Authorization: `Bearer ${user.token}`, // If using JWT authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved searches");
      }

      const data = await response.json();
      setSavedSearches(data);
    } catch (err) {
      console.error("Error fetching saved searches:", err);
      setError("Failed to load saved searches. Please try again later.");
    }
  };

  // Function to handle deleting a saved search
  const handleDeleteSearch = async (searchId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/savedSearches/${searchId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`, // If using JWT authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete saved search");
      }

      // Refresh saved searches
      fetchSavedSearches();
    } catch (err) {
      console.error("Error deleting saved search:", err);
      alert("Failed to delete saved search. Please try again.");
    }
  };

  // Function to execute a saved search
  const executeSearch = (searchQuery) => {
    // This will redirect to the pet list page with the saved query parameters
    window.location.href = `/petlist?${searchQuery}`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="adopter-dashboard">
      <Row>
        <Col md={3} className="mb-4">
          <div className="sticky-top pt-3">
            <h4>{profile.name}</h4>
            <div className="list-group mt-4">
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                My Profile
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "searches" ? "active" : ""
                }`}
                onClick={() => setActiveTab("searches")}
              >
                Pawboritas
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "applications" ? "active" : ""
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
            </div>
            <Button variant="primary" className="w-100 mt-4" href="/petlist">
              Find Pets
            </Button>
          </div>
        </Col>

        <Col md={9}>
          {activeTab === "profile" && (
            <ProfileSection
              profile={profile}
              setProfile={setProfile}
              isAdopter={true}
            />
          )}

          {activeTab === "searches" && (
            <div>
              <h2>Saved Searches</h2>
              {savedSearches.length === 0 ? (
                <p>
                  You don't have any saved searches yet. Start searching for
                  pets to save your criteria!
                </p>
              ) : (
                savedSearches.map((search) => (
                  <Card key={search.search_id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{search.search_name}</Card.Title>
                      <Card.Text>
                        {/* Format search query for display */}
                        {search.search_query
                          .replace(/&/g, ", ")
                          .replace(/=/g, ": ")}
                      </Card.Text>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => executeSearch(search.search_query)}
                        >
                          View Results
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteSearch(search.search_id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === "applications" && (
            <div>
              <h2>My Applications</h2>
              {applications.length === 0 ? (
                <p>You haven't applied to adopt any pets yet.</p>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <img
                            src={app.petImage}
                            alt={app.petName}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col md={10}>
                          <Card.Title>{app.petName}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            From: {app.shelterName}
                          </Card.Subtitle>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <span
                                className={`badge ${
                                  app.status === "Approved"
                                    ? "bg-success"
                                    : app.status === "Rejected"
                                    ? "bg-danger"
                                    : "bg-warning"
                                }`}
                              >
                                {app.status}
                              </span>
                              <small className="text-muted ms-2">
                                Applied: {app.appliedDate}
                              </small>
                            </div>
                            <div>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                              >
                                Message
                              </Button>
                              <Button variant="outline-secondary" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
