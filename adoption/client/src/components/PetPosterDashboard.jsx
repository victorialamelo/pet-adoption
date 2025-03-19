import { useState, useEffect } from "react";
import { Accordion, AccordionItem, Image, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { fetchUserProfile } from "../backend";
import AdoptionRequests from "../pages/AdoptionRequests";
import ProfileSection from "./ProfileSection";
import { getUserPostedPets } from "../pages/getpetbyid";

export default function PetPosterDashboard() {
  const [editingPetId, setEditingPetId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", description: "" });
  const { user } = useAuth();
//   const navigate = useNavigate();
//   const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    registrationID: "",
    about: "",
  });

  // Fetch user profile data and pets
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchUserProfile(user);
        const userData = response;

        setProfile({
          name: userData.entity_name || userData.user_name,
          website: userData.entity_website || '',
          registrationID: userData.entity_registration_id || '',
          about: userData.about || ''
        });

        // Fetch pets posted by the user
        const userId = localStorage.getItem('user');
        if (userId) {
          const userPets = await getUserPostedPets(userId);
          setPets(userPets || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Handle pet edit form
  const handleEditClick = (pet) => {
    setEditingPetId(pet.id);
    setEditFormData({ name: pet.name, description: pet.description });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e, petId) => {
    e.preventDefault();
    console.log("Updating pet", petId, editFormData);
    // Here you would call your API to update the pet
    // For now we'll just update the UI
    setPets(prevPets => prevPets.map(pet =>
      pet.id === petId
        ? { ...pet, name: editFormData.name, description: editFormData.description }
        : pet
    ));
    setEditingPetId(null);
  };

  // Handle pet status change
  const handlePetStatusChange = async (petId, newStatus) => {
    try {
      // await updatePetStatus(petId, newStatus); // Uncomment when API is ready
      console.log("Updating status", petId, newStatus);

      // Update the local state to reflect the change
      setPets(prevPets => prevPets.map(pet =>
        pet.id === petId ? { ...pet, status: newStatus } : pet
      ));
    } catch (err) {
      console.error("Error updating pet status:", err);
      alert("Failed to update pet status. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <section className="dashboard-container row">
        <ProfileSection
          profile={profile}
          setProfile={setProfile}
          isPoster={true}
        />
      </section>

      <section className="dashboard-container row">
        <h1>Posted Peluditos</h1>
        <div className="space-y-4">
          {!pets || pets.length === 0 ? (
            <div className="text-center my-5">
              <p>No pets posted yet.</p>
              <Link to="/postpet" className="btn btn-primary mt-3">Post Your First Pet</Link>
            </div>
          ) : (
            <Accordion defaultActiveKey="0">
              {pets.map((pet, index) => (
                <Card key={pet.id || index}>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-4 w-100">
                        <Image
                          src={pet.img_url}
                          width={200}
                          height="auto"
                          alt={pet.name}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-weight-bold">{pet.name}</h3>
                          <p className="text-muted">
                            Age: {pet.age} | Size: {pet.size} | Weight: {pet.weight} lbs
                          </p>
                        </div>
                        <Form.Select
                          value={pet.status || "Available"}
                          onChange={(e) => handlePetStatusChange(pet.id, e.target.value)}
                          style={{ width: '130px' }}
                        >
                          <option value="Available">Available</option>
                          <option value="Adopted">Adopted</option>
                          <option value="Archived">Archived</option>
                        </Form.Select>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {editingPetId === pet.id ? (
                        <Form onSubmit={(e) => handleEditSubmit(e, pet.id)}>
                          <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="description"
                              value={editFormData.description}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Button type="submit" className="mt-2">Save</Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingPetId(null)}
                            className="mt-2 ms-2"
                          >
                            Cancel
                          </Button>
                        </Form>
                      ) : (
                        <>
                          <p>{pet.description}</p>
                          <Button onClick={() => handleEditClick(pet)}>Edit</Button>
                        </>
                      )}

                      <div className="mt-4">
                        <AdoptionRequests petId={pet.pet_id || pet.id} />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Card>
              ))}
            </Accordion>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/postpet" className="btn btn-primary">Post a New Pet</Link>
        </div>
      </section>
    </>
  );
}
