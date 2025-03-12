// API CLIENT FUNCTIONS - making requests to backend APIs

// import { getAuthHeader } from "./session";

export async function backendAuthLogin(credentials) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
}

export async function backendGetUser(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    const data = await response.json();

    return data;
}

// NOTE: requires a valid session
export async function backendGetUserPokemon(userId) {
    const response = await fetch(`/api/userpokemon/${userId}`, {
        headers: { ...getAuthHeader() },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch adopted Pokémon");
    }

    const data = await response.json();

    return data[0];
}

export async function backendCreateUser(inputs) {
    const response = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
    });
    if (!response.ok) {
        throw new Error("User creation failed");
    }

    const data = await response.json();

    return data;
}

export async function backendCreateUserPokemon(userId, pokemonId) {
    const response = await fetch("/api/userpokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: userId,
            pokemon_id: pokemonId,
        }),
    });
    if (!response.ok) {
        throw new Error("UserPokemon creation failed");
    }

    await response.json();
}

export async function externalGetPokemonDetails(pokemonId) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    if (!response.ok) {
        throw new Error("Failed to load Pokémon details");
    }

    const data = await response.json();

    return data;
}

export async function backendDeleteUserPokemon(pokemonId) {
    const response = await fetch(`/api/userpokemon/${pokemonId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("UserPokemon creation failed");
    }

    await response.json();
}

// USER DASHBOARD HELPER FUNCTIONS
// =================================================================================

// AUTH TOKEN HELPDER
const getAuthToken = () => localStorage.getItem('token');

// API RESPONSE HELPER
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `API error: ${response.status}`);
  }
  return response.json();
};

// FETCH USER PROFILE
export const fetchUserProfile = async (userId) => {
  const response = await fetch(`/api/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return handleResponse(response);
};

// UPDATE USER PROFILE
export const updateUserProfile = async (userId, profileData) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(profileData)
  });
  return handleResponse(response);
};

// FETCH THE USERS POSTS
export const fetchUserPets = async () => {
  const response = await fetch(`/api/pets/posts`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return handleResponse(response);
};

// FETCH PET BY ID
export const fetchPetById = async (petId) => {
  const response = await fetch(`/api/pets/${petId}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return handleResponse(response);
};

// UPDATE PET STATUS?
export const updatePetStatus = async (petId, status) => {
  const response = await fetch(`/api/pets/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ status })
  });
  return handleResponse(response);
};

// POST A PET
export const createPet = async (petData) => {
  const response = await fetch(`/api/pets/pet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(petData)
  });
  return handleResponse(response);
};

// UPDATE PET DETAILS
export const updatePet = async (petId, petData) => {
  const response = await fetch(`/api/pets/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(petData)
  });
  return handleResponse(response);
};

// FETCH ADOPTION REQUESTS
export const fetchAdoptionRequests = async () => {
  const response = await fetch(`/api/requests/adoption-requests`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return handleResponse(response);
};

// UPDATE REQUEST STATUS
export const updateRequestStatus = async (requestId, status) => {
  const response = await fetch(`/api/requests/request-status/${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ request_status: status })
  });
  return handleResponse(response);
};

// CREATE ADOPTION REQUESTS
export const createAdoptionRequest = async (petId, message) => {
  const response = await fetch(`/api/requests/adopt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({
      pet_id: petId,
      request_message: message
    })
  });
  return handleResponse(response);
};

// FETCH PETS WITH ADOPTION REQUESTS
export const fetchPetsWithRequests = async () => {
  try {
    // Get all pets
    const petsData = await fetchUserPets();

    // Get all adoption requests
    const requestsData = await fetchAdoptionRequests();

    // Map through pets and add their relevant requests
    return petsData.data.map(pet => {
      // Filter requests for this specific pet
      const petRequests = requestsData.data.filter(req => req.pet_id === pet.pet_id);

      // Transform requests to match the component's expected format
      const applicants = petRequests.map(req => ({
        id: req.request_id,
        name: req.requester_name || 'Anonymous',
        contact: req.requester_email || 'No contact provided',
        dateApplied: new Date(req.request_date).toISOString().split('T')[0],
        status: req.request_status,
        message: req.request_message
      }));

      // Format pet data
      return {
        id: pet.pet_id,
        name: pet.name,
        age: `${pet.age || 'Unknown'} years`,
        size: pet.size,
        weight: pet.weight,
        activity: pet.activity_level,
        specialNeeds: pet.has_special_needs ? "Yes" : "None",
        pottyTrained: pet.potty_trained,
        neutered: pet.neutered,
        goodWith: [
          pet.good_with_cats ? "Cats" : null,
          pet.good_with_dogs ? "Dogs" : null,
          pet.good_with_kids ? "Kids" : null,
        ].filter(Boolean),
        datePosted: new Date(pet.post_date).toISOString().split('T')[0],
        status: pet.status || 'Available',
        img_url: pet.img_url,
        applicants: applicants
      };
    });
  } catch (error) {
    console.error("Error fetching pets with requests:", error);
    throw error;
  }
};
