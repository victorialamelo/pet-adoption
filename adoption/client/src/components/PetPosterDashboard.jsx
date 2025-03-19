import { useState, useEffect } from "react";
import { Accordion, AccordionItem, Image, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { fetchUserProfile, backendEditPet } from "../backend";
import AdoptionRequests from "../pages/AdoptionRequests";
import ProfileSection from "./ProfileSection";
import { getUserPostedPets } from "../pages/getpetbyid";

export default function PetPosterDashboard() {
  const [editingPetId, setEditingPetId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
  }, [user, updateSuccess]);

  // Handle pet edit form
  const handleEditClick = (pet) => {
    console.log("handleEditClick", pet);
    setEditingPetId(pet.pet_id);
    setEditFormData({
      name: pet.name || '',
      animal_type: pet.animal_type || '',
      weight: pet.weight || '',
      size: pet.size || '',
      gender: pet.gender || '',
      activity_level: pet.activity_level || '',
      neutered: pet.neutered || 0,
      has_special_needs: pet.has_special_needs || 0,
      potty_trained: pet.potty_trained || 0,
      pet_description: pet.pet_description || '',
      good_with_cats: pet.good_with_cats || 0,
      good_with_dogs: pet.good_with_dogs || 0,
      good_with_kids: pet.good_with_kids || 0,
      good_with_smallspaces: pet.good_with_smallspaces || 0,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e, petId) => {
    e.preventDefault();
    try {
      // Create a copy of the form data to remove empty values
      const dataToSubmit = {};

      // Only include fields that have values
      Object.keys(editFormData).forEach(key => {
        if (editFormData[key] !== null &&
            editFormData[key] !== undefined &&
            editFormData[key] !== '') {
          dataToSubmit[key] = editFormData[key];
        }
      });

      // Check if we have any data to submit
      if (Object.keys(dataToSubmit).length === 0) {
        setError("No changes detected. Please modify at least one field.");
        return;
      }

      console.log("Submitting data:", dataToSubmit);
      const updatedPet = await backendEditPet(petId, dataToSubmit);
      console.log("Update successful:", updatedPet);

      // Update the pets list with the updated pet
      setPets(prevPets => prevPets.map(pet =>
        pet.pet_id === petId ? { ...pet, ...updatedPet } : pet
      ));

      setEditingPetId(null);
      setUpdateSuccess(prev => !prev); // Toggle to trigger a re-fetch
    } catch (err) {
      console.error("Error updating pet:", err);
      setError(`Failed to update pet: ${err.message}`);
    }
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
                <Card key={pet.pet_id || index}>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-4 w-100">
                        <Link className="nav-link" to={`/petdetails/${pet.pet_id}`}>
                          <Image
                            src={pet.img_url}
                            width={200}
                            height="auto"
                            alt={pet.name}
                            className="rounded"
                          />
                        </Link>
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
                      {editingPetId === pet.pet_id ? (
                        <Form onSubmit={(e) => handleEditSubmit(e, pet.pet_id)}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={editFormData.name || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Animal Type</Form.Label>
                            <Form.Control
                              type="text"
                              name="animal_type"
                              value={editFormData.animal_type || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                              type="number"
                              name="weight"
                              value={editFormData.weight || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                              type="text"
                              name="size"
                              value={editFormData.size || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                              type="text"
                              name="gender"
                              value={editFormData.gender || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Activity Level</Form.Label>
                            <Form.Control
                              type="text"
                              name="activity_level"
                              value={editFormData.activity_level || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Neutered</Form.Label>
                            <Form.Select
                              name="neutered"
                              value={editFormData.neutered || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Has Special Needs</Form.Label>
                            <Form.Select
                              name="has_special_needs"
                              value={editFormData.has_special_needs || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Potty Trained</Form.Label>
                            <Form.Select
                              name="potty_trained"
                              value={editFormData.potty_trained || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Pet Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="pet_description"
                              value={editFormData.pet_description || ''}
                              onChange={handleEditChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Good with Cats</Form.Label>
                            <Form.Select
                              name="good_with_cats"
                              value={editFormData.good_with_cats || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Good with Dogs</Form.Label>
                            <Form.Select
                              name="good_with_dogs"
                              value={editFormData.good_with_dogs || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Good with Kids</Form.Label>
                            <Form.Select
                              name="good_with_kids"
                              value={editFormData.good_with_kids || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Good with Small Spaces</Form.Label>
                            <Form.Select
                              name="good_with_smallspaces"
                              value={editFormData.good_with_smallspaces || 0}
                              onChange={handleEditChange}
                            >
                              <option value={1}>Yes</option>
                              <option value={0}>No</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                              type="file"
                              name="photo"
                              onChange={handleFileChange}
                            />
                            {pet.img_url && (
                              <div className="mt-2">
                                <small>Current photo:</small>
                                <img
                                  src={pet.img_url}
                                  alt="Current pet"
                                  style={{ width: '100px', height: 'auto', display: 'block', marginTop: '5px' }}
                                />
                              </div>
                            )}
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
                          <p>{pet.pet_description}</p>
                          <Button onClick={() => handleEditClick(pet)}>Edit</Button>
                        </>
                      )}
                      <div className="mt-4">
                        <AdoptionRequests petId={pet.pet_id} />
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
