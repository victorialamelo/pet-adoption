// API CLIENT FUNCTIONS - making requests to backend APIs

import { getAuthHeader } from "./session";

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
