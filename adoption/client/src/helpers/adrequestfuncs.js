// APIs to Send an Adoption Request, Get All Adoption Requests and Update Adoption Status

//Create Adoption Request (WORKING)
export const createAdoptionRequest = async (pet_id, request_message) => {
    try {
        const response = await fetch("http://localhost:5001/requests/adopt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Stored token
            },
            body: JSON.stringify({ pet_id, request_message })
        });

        const responseData = await response.json(); // Get JSON response

        console.log("Server Response:", responseData);

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to submit adoption request");
        }

        return responseData;
    } catch (error) {
        console.error("Error submitting adoption request:", error);
        return null;
    }
};

//Get All or By ID the Adoption Requests
export const getAdoptionRequests = async (pet_id = null, request_id = null) => {
    try {
        let url = "http://localhost:5001/requests/adoption-requests";
        const queryParams = [];

        if (pet_id) queryParams.push(`pet_id=${pet_id}`);
        if (request_id) queryParams.push(`request_id=${request_id}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join("&")}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch adoption requests");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching adoption requests:", error);
        return null;
    }
};

//Get my Adoption Requests as an adopter
export const getMyAdoptionRequests = async () => {
    try {
        const url = "http://localhost:5001/requests/my-requests";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch your adoption requests");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching your adoption requests:", error);
        return null;
    }
};

//Update Adoption Status
export const updateAdoptionRequestStatus = async (request_id, request_status) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve stored token
        const url = `http://localhost:5001/requests/request-status/${request_id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ request_status })
        });

        if (!response.ok) {
            throw new Error("Failed to update adoption request status");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating adoption request status:", error);
        return null;
    }
};
