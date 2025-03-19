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
  const [loadingRequestId, setLoadingRequestId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!petId) return;

    const loadRequests = async () => {
      try {
        const response = await getAdoptionRequests(petId);
        // Handle different response structures
        const requestsData = response.data || response || [];
        setRequests(requestsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching adoption requests:", err);
        setError("Failed to load adoption requests.");
      }
    };

    loadRequests();
  }, [user, petId, navigate]);

  const toggleExpand = (requestId) => {
    setExpandedRequest((prev) => (prev === requestId ? null : requestId));
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      setLoadingRequestId(requestId); // Indicate loading state
      const response = await updateAdoptionRequestStatus(requestId, newStatus);

      if (response && !response.error) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.request_id === requestId ? { ...req, request_status: newStatus } : req
          )
        );
      } else {
        const errorMsg = response?.error || "Failed to update status";
        console.error(errorMsg);
        alert("Failed to update status. Please try again.");
      }
    } catch (err) {
      console.error("Error updating request status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoadingRequestId(null); // Reset loading state
    }
  };

  if (!petId) {
    return null; // Don't render anything if there's no petId
  }

  return (
    <div className="adoption-requests">
      <h3>Adoption Requests</h3>
      {error && <p className="text-danger">{error}</p>}
      {requests.length === 0 && !error && <p>No requests have been made for this pet.</p>}

      {requests.map((request) => (
        <div key={request.request_id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <strong>{request.requester_name}</strong> - {" "}
                <select
                  value={request.request_status}
                  onChange={(e) => handleStatusChange(request.request_id, e.target.value)}
                  disabled={loadingRequestId === request.request_id}
                  className="form-select form-select-sm d-inline-block w-auto"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                </select>
                {loadingRequestId === request.request_id &&
                  <small className="ms-2 text-muted">Updating...</small>
                }
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => toggleExpand(request.request_id)}
              >
                {expandedRequest === request.request_id ? "▲ Hide" : "▼ Show"}
              </button>
            </div>

            {expandedRequest === request.request_id && (
              <div className="mt-3">
                <p>
                  <strong>Message:</strong> {request.request_message || "No message provided"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {request.request_date
                    ? new Date(request.request_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    // Navigate to messaging with this user
                    // navigate(`/messages/${request.requester_id}`);
                    alert("Messaging functionality not implemented yet");
                  }}
                >
                  Message Applicant
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
