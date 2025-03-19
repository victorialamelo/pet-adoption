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
          about: userData.about || ""
        });

        // In a real implementation, you would also fetch:
        // - Saved pet searches
        // - Active applications
        // For now, we'll use dummy data
        setSavedSearches([
          { id: 1, name: "Small Dogs Near Me", criteria: "Dogs, Small, <10 miles" },
          { id: 2, name: "Senior Cats", criteria: "Cats, 7+ years" }
        ]);

        setApplications([
          { id: 101, petName: "Buddy", petImage: "../src/assets/dogsvg.svg", shelterName: "Happy Paws", status: "Pending", appliedDate: "2023-11-15" },
          { id: 102, petName: "Whiskers", petImage: "../src/assets/dogsvg.svg", shelterName: "Furry Friends", status: "Approved", appliedDate: "2023-11-10" }
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

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <Row>
        <Col md={3} className="mb-4">
          <div className="sticky-top pt-3">
            <h3>{profile.name}'s Adoption Center</h3>
            <div className="list-group mt-4">
              <button
                className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                My Profile
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "searches" ? "active" : ""}`}
                onClick={() => setActiveTab("searches")}
              >
                Saved Searches
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "applications" ? "active" : ""}`}
                onClick={() => setActiveTab("applications")}
              >
                My Applications
              </button>
            </div>
            <Button variant="primary" className="w-100 mt-4" href="/search">
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
                <p>You don't have any saved searches yet. Start searching for pets to save your criteria!</p>
              ) : (
                savedSearches.map(search => (
                  <Card key={search.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{search.name}</Card.Title>
                      <Card.Text>{search.criteria}</Card.Text>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" href="/search">View Results</Button>
                        <Button variant="outline-danger" size="sm">Delete</Button>
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
                applications.map(app => (
                  <Card key={app.id} className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <img src={app.petImage} alt={app.petName} className="img-fluid rounded" />
                        </Col>
                        <Col md={10}>
                          <Card.Title>{app.petName}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">From: {app.shelterName}</Card.Subtitle>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <span className={`badge ${app.status === 'Approved' ? 'bg-success' : app.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                {app.status}
                              </span>
                              <small className="text-muted ms-2">Applied: {app.appliedDate}</small>
                            </div>
                            <div>
                              <Button variant="outline-primary" size="sm" className="me-2">Message</Button>
                              <Button variant="outline-secondary" size="sm">View Details</Button>
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
