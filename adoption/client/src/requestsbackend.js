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
  console.log(data.message);
  return data;
}

//API for User Login
export async function backendLoginUser({ email, password }) {
  const credentials = { email, password };

  try {
    const response = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    console.log(data.message);
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

  // Create FormData object to handle file uploads
  const formData = new FormData();

  // Add all properties from newPet to formData
  Object.keys(newPet).forEach(key => {
    if (key === 'photo' && newPet[key]) {
      formData.append('photo', newPet[key]);
    } else {
      formData.append(key, newPet[key]);
    }
  });

  const response = await fetch("http://localhost:5001/pets/pet", {
    method: "POST",
    headers: {
      // Don't set Content-Type when using FormData - browser will set it with boundary
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

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

  console.log(response.message);
  return await response.json();
}

//API for Editing Pet Details (only logged-in users can access)
export async function backendEditPet(petId, updatedPet) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }

  const formData = new FormData();

  if (!updatedPet || Object.keys(updatedPet).length === 0) {
    throw new Error("No data provided for update");
  }

  Object.keys(updatedPet).forEach(key => {
    if (updatedPet[key] === null || updatedPet[key] === undefined || updatedPet[key] === '') {
      console.log(`Skipping empty value for ${key}`);
      return;
    }

    if (key === 'photo' && updatedPet[key]) {
      formData.append('photo', updatedPet[key]);
      console.log(`Added photo to formData: ${updatedPet[key].name}`);
    } else {
      formData.append(key, updatedPet[key]);
    }
  });

  const response = await fetch(`http://localhost:5001/pets/${petId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    try {
      const errorMessage = await response.json();
      console.error("Error updating pet:", errorMessage);
      throw new Error(errorMessage.message || "Failed to update pet");
    } catch (err) {
      console.error("Failed to parse error response:", err);
      throw new Error(`Failed to update pet: ${response.status} ${response.statusText}`);
    }
  }

  return await response.json();
}


//API for Fetching a Pet Details (only logged-in users can access)
export async function backendFetchPetDetails(petId) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated. To check our pets, please go back to Home Page and login.");
  }

  const response = await fetch(`http://localhost:5001/pets/${petId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });


  return handleResponse(response);
}

// API RESPONSE HELPER
const handleResponse = async (response) => {

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

  return handleResponse(response);
};

// UPDATE USER PROFILE
export const updateUserProfile = async (userId, profileData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5001/auth/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  return handleResponse(response);
};
