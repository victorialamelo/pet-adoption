import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { getAdoptionRequests } from "../pages/adrequestfuncs";

export default function AdoptionRequests({ petId }) {
  const { user } = useAuth(); // Get the logged-in user
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const loadRequests = async () => {
      try {
        const response = await fetchAdoptionRequests(petId);
        setRequests(response);
      } catch (err) {
        console.error("Error fetching adoption requests:", err);
      }
    };

    if (petId) {
      loadRequests();
    }
  }, [user, petId, navigate]);

  const toggleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div style={styles.container}>
      <h3>{requests.length > 0 ? "Adoption Requests" : "No requests have been made for this pet"}</h3>
      {requests.map((request) => (
        <div key={request.id} style={styles.requestBox}>
          <div style={styles.requestHeader} onClick={() => toggleExpand(request.id)}>
            <span>{request.user_name}</span>
            <button style={styles.arrowButton}>{expandedRequest === request.id ? "▲" : "▼"}</button>
          </div>
          {expandedRequest === request.id && (
            <div style={styles.requestDetails}>
              <p><strong>Message:</strong> {request.request_message}</p>
              <p><strong>Date:</strong> {new Date(request.request_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}