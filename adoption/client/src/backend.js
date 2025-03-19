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
  console.log("Returned Sign Up Data", data);
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

  console.log("Sending request to add pet with form data");

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

  return await response.json();
}

//API for Editing Pet Details (only logged-in users can access)
export async function backendEditPet(petId, updatedPet) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }

  // Create FormData object to handle file uploads
  const formData = new FormData();

  // Debug: Log the updatedPet object to see what's being passed in
  console.log("updatedPet object:", updatedPet);

  // Check if updatedPet is empty
  if (!updatedPet || Object.keys(updatedPet).length === 0) {
    throw new Error("No data provided for update");
  }

  // Add all properties from updatedPet to formData
  Object.keys(updatedPet).forEach(key => {
    // Skip null, undefined, or empty string values
    if (updatedPet[key] === null || updatedPet[key] === undefined || updatedPet[key] === '') {
      console.log(`Skipping empty value for ${key}`);
      return;
    }

    if (key === 'photo' && updatedPet[key]) {
      formData.append('photo', updatedPet[key]);
      console.log(`Added photo to formData: ${updatedPet[key].name}`);
    } else {
      formData.append(key, updatedPet[key]);
      console.log(`Added ${key}: ${updatedPet[key]} to formData`);
    }
  });

  // Debug: Log the contents of formData (FormData is not directly loggable)
  console.log("FormData entries:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
  }

  console.log(`Sending request to update pet ${petId}`);

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

  return handleResponse(response);
};

// UPDATE USER PROFILE
export const updateUserProfile = async (userId, profileData) => {
  const token = localStorage.getItem("token");
  console.log("updateUserProfile profileData", profileData)
  const response = await fetch(`http://localhost:5001/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: profileData
  });
  return handleResponse(response);
};
