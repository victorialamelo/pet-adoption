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
