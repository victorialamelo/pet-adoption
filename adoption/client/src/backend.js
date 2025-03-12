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
    const response = await fetch(`/auth/register`, {
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
