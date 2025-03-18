import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { getAdoptionRequests } from "./adrequestfuncs";

export default function AdoptionRequests({ petId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    console.log("Received petId in AdoptionRequests:", petId);

    if (!user) {
      console.warn("User not authenticated. Redirecting to login...");
      navigate("/login");
      return;
    }

    if (!petId) {
      console.warn("No petId provided, skipping fetch.");
      return;
    }

    const loadRequests = async () => {
      try {
        console.log(`Fetching adoption requests for petId: ${petId}`);
        const response = await getAdoptionRequests(petId);
        console.log("Adoption Requests Response:", response);

        setRequests(response || []);
      } catch (err) {
        console.error("Error fetching adoption requests:", err);
      }
    };

    loadRequests();
  }, [user, petId, navigate]);

  const toggleExpand = (requestId) => {
    setExpandedRequest((prev) => (prev === requestId ? null : requestId));
  };

  return (
    <div>
      <h3>
        {requests.length > 0
          ? "Adoption Requests"
          : "No requests have been made for this pet"}
      </h3>
      {requests.map((request) => (
        <div key={request.request_id}>
          <div onClick={() => toggleExpand(request.request_id)}>
            <span>{request.requester_name}</span>
            <button type="button">
              {expandedRequest === request.request_id ? "▲" : "▼"}
            </button>
          </div>
          {expandedRequest === request.request_id && (
            <div>
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