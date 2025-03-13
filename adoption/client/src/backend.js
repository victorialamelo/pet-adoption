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
export async function backendLoginUser({email, password}) {
    const credentials = {email, password};

    console.log("Sending login request with:", credentials); //Debugging

    const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        console.log("Login failed");
        throw new Error("Login failed");
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


//API for Posting a Pet (only logged-in users can access)
export async function backendAddPostPet(userId, newPet) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("User not authenticated");
    }

    console.log("Sending request to add pet:", newPet);

    const response = await fetch("http://localhost:5001/pets/pet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newPet),
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Error adding pet:", errorMessage);
        throw new Error(errorMessage.message || "Failed to add pet");
    }

    return await response.json();
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

// const TOKEN_STORAGE_KEY = "token";

// export function hasSession() {
//     return localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
// }

// export function getAuthHeader() {
//     const token = localStorage.getItem(TOKEN_STORAGE_KEY);
//     if (!token) {
//         throw new Error("no session");
//     }
//     return {
//         Authorization: `Bearer ${token}`,
//     };
// }

// export function getCurrentSession() {
//     const token = localStorage.getItem(TOKEN_STORAGE_KEY);
//     if (!token) {
//         throw new Error("no session");
//     }

//     const payload = jwtDecode(token);

//     return {
//         userId: payload.user_id,
//     };
// }

// export function deleteCurrentSession() {
//     localStorage.removeItem(TOKEN_STORAGE_KEY);
// }

// export function saveSession(token) {
//     localStorage.setItem(TOKEN_STORAGE_KEY, token);
// }
