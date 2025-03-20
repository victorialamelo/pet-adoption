import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { fetchUserProfile } from "../backend";
import { getMyAdoptionRequests } from "../helpers/adrequestfuncs";
import { useNavigate } from "react-router-dom";
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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

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
        // For now, we'll use dummy data
        setSavedSearches([
          { id: 1, name: "Small Dogs Near Me", criteria: "Dogs, Small, <10 miles" },
          { id: 2, name: "Senior Cats", criteria: "Cats, 7+ years" }
        ]);


      } catch (err) {
        console.error("Error fetching adopter profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();

    const fetchRequests = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const fetchedRequests = await getMyAdoptionRequests();
        console.log("fetchedRequests", fetchedRequests)
        if (fetchedRequests) {
          setRequests(fetchedRequests.data);
        }
      } catch (err) {
        setError("Failed to load your adoption requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

  }, [user]);

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="adopter-dashboard">
      <Row>
        <Col md={3} className="mb-4">
          <div className="sticky-top pt-3">
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
                Pawboritas
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "requests" ? "active" : ""}`}
                onClick={() => setActiveTab("requests")}
              >
                Requests
              </button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate("/petlist")}>
              Find Pets
              </button>

            </div>

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

          {activeTab === "requests" && (
            <div>
              <h2>My Requests</h2>
              {requests.length === 0 ? (
                <p>You haven't applied to adopt any pets yet.</p>
              ) : (
                requests.map(app => (
                  <Card key={app.id} className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <img src={app.pet_image} alt={app.pet_name} className="img-fluid rounded" />
                        </Col>
                        <Col md={10}>
                          <Card.Title>{app.pet_name}</Card.Title>
                          <Card.Subtitle className="mb-2">From: {app.owner_name}</Card.Subtitle>
                          <Card.Subtitle className="mb-2">Request Message: {app.request_message}</Card.Subtitle>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                              <span className={`badge ${app.status === 'Approved' ? 'bg-success' : app.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                {app.request_status}
                              </span>
                              <small className="text-muted ms-2">Applied: {app.request_date}</small>
                            </div>
                            <div>
                              <Button variant="outline-primary" size="sm" className="me-2">Message</Button>
                              <Button variant="outline-secondary" size="sm" href={`/petdetails/${app.pet_id}`}>View Details</Button>
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
