import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../backend";
import { getAdoptionRequests, updateAdoptionRequestStatus, deleteAdoptionRequest } from "../helpers/adrequestfuncs";

export default function AdoptionRequests({ petId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requester, setRequester] = useState([]);
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loadingRequestId, setLoadingRequestId] = useState(null);
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

  const loadRequesterInfo = async (requesterID) => {
    try {
      setLoading(true);
      const response = await fetchUserProfile(requesterID);
      const requesterData = response;
      setRequester(requesterData);
    } catch (err) {
      console.error("Error fetching adopter profile:", err);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (requestId) => {
    setExpandedRequest((prev) => (prev === requestId.request_id ? null : requestId.request_id));
    loadRequesterInfo(requestId.requester_id);
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

  const handleDeleteRequest = async (requestId) => {
    console.log("handleDeleteRequest", requestId);
    try {
      await deleteAdoptionRequest(requestId);

      // Option 1: Update state directly (more efficient)
      setRequests(prevRequests => prevRequests.filter(req => req.request_id !== requestId));

      // Option 2: Reload all requests from server
      // This is useful if you need to ensure you have the latest data
      if (petId) {
        const response = await getAdoptionRequests(petId);
        const requestsData = response.data || response || [];
        setRequests(requestsData);
      }

      // Reset expanded state if the deleted request was expanded
      if (expandedRequest === requestId) {
        setExpandedRequest(null);
      }

    } catch (error) {
      console.error("Failed to delete request:", error.message);
      alert("Failed to delete request: " + error.message);
    }
  };

  if (!petId) {
    return null; // Don't render anything if there's no petId
  }

  if (loading) {
    return <div> </div>
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
                <strong>{request.requester_name}</strong>{" "}
                {loadingRequestId === request.request_id &&
                  <small className="ms-2 text-muted">Updating...</small>
                }
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => toggleExpand(request)}
              >
                {expandedRequest === request.request_id ? "▲" : "▼ Show"}
              </button>
            </div>

            {expandedRequest === request.request_id && (
              <div className="mt-3">


                <small><p><strong>Message:</strong></p></small>
                <p>{request.request_message || "No message provided"}</p>
                <p><strong>Request Status:{" "}</strong>
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
                </p>
                <div className="request-details d-flex justify-content-between align-items-center">
                  <p>
                  <small>
                    <strong>Date: </strong>{" "}
                    {request.request_date
                      ? new Date(request.request_date).toLocaleDateString()
                      : "N/A"}
                  </small>
                  </p>
                  <p><small><strong>Email: </strong>{" "}{requester.email}</small></p>
                  <p><small><strong>Phone: </strong>{" "}{requester.phone}</small></p>
                  <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleDeleteRequest(request.request_id)}
                >
                Delete
                </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
