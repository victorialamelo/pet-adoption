import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap";
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

  // Modal states
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);

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
          { id: 1, name: "Small Dogs Near Me", criteria: "Dogs, Small" },
          { id: 2, name: "Senior Cats", criteria: "Cats, Medium" }
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

  // Function to open message modal
  const handleOpenMessageModal = (request) => {
    setSelectedRequest(request);
    setMessage("");
    setSendError(null);
    setShowMessageModal(true);
  };

  // Function to open details modal
  const handleOpenDetailsModal = async (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true); // Show modal first to avoid delay
    console.log("request",request);

    try {
      // First set loading state
      setLoading(true);

      // Fetch the requester details using the requesterID
      const requestDetails = await fetchUserProfile(request.requester_id);
      console.log("requestDetails", requestDetails)
      // Set the owner details from the fetched data
      setOwnerDetails({
        name: requestDetails.user_name || "Owner Name Not Available",
        email: requestDetails.email || "Not Available",
        phone: requestDetails.phone || "Not Available",
        address: requestDetails.address || "Address Not Available"
      });
    } catch (err) {
      console.error("Error fetching owner details:", err);
      setOwnerDetails({
        name: "Error loading owner details",
        email: "Not Available",
        phone: "Not Available",
        address: "Not Available"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to send a message
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedRequest) return;

    try {
      setSending(true);
      setSendError(null);

      // Replace with your actual API call
      // await sendMessageToOwner(selectedRequest.request_id, message);

      // For now, let's simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success handling
      setMessage("");
      setShowMessageModal(false);
      alert("Message sent successfully!");

    } catch (err) {
      console.error("Error sending message:", err);
      setSendError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

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
                        <Button variant="outline-primary" size="sm" href="/petlist">View Results</Button>
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
                              <small className="text-muted ms-2">
                                  Applied: {new Date(app.request_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </small>
                            </div>
                            <div>
                              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleOpenMessageModal(app)}>Message</Button>
                              <Button variant="outline-secondary" size="sm" onClick={() => handleOpenDetailsModal(app)}>View Details</Button>
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

      {/* Message Modal */}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Message to {selectedRequest?.owner_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {sendError && <div className="alert alert-danger">{sendError}</div>}
            <Form.Group>
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMessageModal(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={sending || !message.trim()}
            >
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </Modal.Footer>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Owner Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ownerDetails && (
            <div>
              <h5>Pet Information</h5>
              <p><strong>Pet Name:</strong> {selectedRequest?.pet_name}</p>
              <p><strong>Status:</strong> {selectedRequest?.request_status}</p>
              <p><strong>Request Date:</strong> {selectedRequest?.request_date ? new Date(selectedRequest.request_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowDetailsModal(false);
              handleOpenMessageModal(selectedRequest);
            }}
          >
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
