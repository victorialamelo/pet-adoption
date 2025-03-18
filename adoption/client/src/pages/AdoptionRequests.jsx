import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { getAdoptionRequests, updateAdoptionRequestStatus } from "./adrequestfuncs";

export default function AdoptionRequests({ petId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!petId) return;

    const loadRequests = async () => {
      try {
        const response = await getAdoptionRequests(petId);
        setRequests(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching adoption requests:", err);
        setError("Failed to load adoption requests.");
      }
    };

    loadRequests();
  }, [user, petId]);

  const toggleExpand = (requestId) => {
    setExpandedRequest((prev) => (prev === requestId ? null : requestId));
  };

  const handleStatusChange = async (requestId, newStatus) => {
    setLoading(requestId); // Indicate loading state
    const response = await updateAdoptionRequestStatus(requestId, newStatus);
    setLoading(null); // Reset loading state

    if (response) {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.request_id === requestId ? { ...req, request_status: newStatus } : req
        )
      );
    } else {
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div>
      <h3>Adoption Requests</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {requests.length === 0 && !error && <p>No requests have been made for this pet.</p>}

      {requests.map((request) => (
        <div key={request.request_id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              <strong>{request.requester_name}</strong> -  
              <select
                value={request.request_status}
                onChange={(e) => handleStatusChange(request.request_id, e.target.value)}
                disabled={loading === request.request_id}
              >
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              </select>
            </span>
            <button type="button" onClick={() => toggleExpand(request.request_id)}>
              {expandedRequest === request.request_id ? "▲ Hide" : "▼ Show"}
            </button>
          </div>

          {expandedRequest === request.request_id && (
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Message:</strong> {request.request_message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {request.request_date
                  ? new Date(request.request_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}