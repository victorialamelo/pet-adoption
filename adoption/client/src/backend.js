// API CLIENT FUNCTIONS - making requests to backend APIs

//API to Create User WORKING.
export async function backendCreateUser(inputs) {
  //console.log("Sending data:", inputs);
  const response = await fetch("http://localhost:5001/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error || "User creation failed";
    console.error("User creation failed:", errorMessage);
    throw new Error(errorMessage); // throw error with specific message
  }

  const data = await response.json();

  return data;
}

//API for User Login
export async function backendLoginUser({ email, password }) {
  const credentials = { email, password };

  console.log("Sending login request with:", credentials); //Debugging

  try {
    const response = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    console.log("API Response from Backend:", data); // Debugging

    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Login failed");
  }

}

// PETS.JS
//API for Posting a Pet (only logged-in users can access)
export async function backendAddPostPet(newPet) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }

  console.log("Sending request to add pet:", JSON.stringify(newPet, null, 2));

  const response = await fetch("http://localhost:5001/pets/pet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newPet),
  });

  console.log("response", response)

  if (!response.ok) {
    try {
      const errorMessage = await response.json();
      console.error("Error adding pet:", errorMessage);
      throw new Error(errorMessage.message || "Failed to add pet");
    } catch (err) {
      console.error("Failed to parse error response:", err);
      throw new Error(`Failed to add pet: ${response.status} ${response.statusText}`);
    }
  }

  return await response.json();
}



//API for Fetching a Pet Details (only logged-in users can access)
export async function backendFetchPetDetails(petId) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }

  console.log(`Fetching details for pet with ID: ${petId}`);

  const response = await fetch(`http://localhost:5001/pets/${petId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  console.log("Response:", response);

  return handleResponse(response);
}

// API RESPONSE HELPER
const handleResponse = async (response) => {
  console.log("API Response Status:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("API Error:", errorData);
    throw new Error(errorData?.message || `API error: ${response.status}`);
  }

  return response.json();
};

// USERS.JS
// FETCH USER PROFILE
export const fetchUserProfile = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`http://localhost:5001/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  console.log("fetchUserProfile response:", response);

  return handleResponse(response);
};

// UPDATE USER PROFILE
export const updateUserProfile = async (userId, profileData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  return handleResponse(response);
};
