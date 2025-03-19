//API to fetch all posted pets by current user´s id.

export const getUserPostedPets = async (user_id) => {
    try {
        const response = await fetch(`http://localhost:5001/pets/allpostedpets/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`//Stored token.
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user posted pets");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user posted pets:", error);
        return null;
    }
};
