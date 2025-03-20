import { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { backendEditPet } from "../backend";

export default function EditPetDetails({ petId, onSuccess }) {
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pet, setPet] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        // Import the function dynamically to avoid circular dependencies
        const { backendFetchPetDetails } = await import("../backend");
        console.log(petId);
        const response = await backendFetchPetDetails(petId);
        const petData = response[0];
        console.log("petData", response[0]);

        if (!petData) {
          throw new Error("Pet not found");
        }

        setPet(petData);
        setEditFormData({
          name: petData.name || '',
          animal_type: petData.animal_type || '',
          weight: petData.weight || '',
          size: petData.size || '',
          gender: petData.gender || '',
          activity_level: petData.activity_level || '',
          neutered: petData.neutered || 0,
          has_special_needs: petData.has_special_needs || 0,
          potty_trained: petData.potty_trained || 0,
          pet_description: petData.pet_description || '',
          good_with_cats: petData.good_with_cats || 0,
          good_with_dogs: petData.good_with_dogs || 0,
          good_with_kids: petData.good_with_kids || 0,
          good_with_smallspaces: petData.good_with_smallspaces || 0,
        });
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setError("Failed to load pet data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPetData();
    }
  }, [petId, updateSuccess]);

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {};
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
      setPet(prev => ({ ...prev, ...updatedPet }));
      setEditFormData(prev => ({ ...prev, ...updatedPet }));

      // Call the success callback with the updated pet data
      if (onSuccess) {
        onSuccess(updatedPet);
      }

      setUpdateSuccess(prev => !prev);
      setIsEditing(false);

    } catch (err) {
      console.error("Error updating pet:", err);
      setError(`Failed to update pet: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-3"><p>Loading pet details...</p></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!pet) {
    return <div className="alert alert-warning">Pet not found</div>;
  }

  return (
    <>
    {isEditing && (
    <Form onSubmit={handleEditSubmit}>
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
        <Form.Label>Pet Description</Form.Label>
        <Form.Control
          as="textarea"
          name="pet_description"
          value={editFormData.pet_description || ''}
          onChange={handleEditChange}
        />
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
            <Image
              src={pet.img_url}
              alt="Current pet"
              style={{ width: '100px', height: 'auto', display: 'block', marginTop: '5px' }}
            />
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Animal Type</Form.Label>
        <Form.Select
          name="animal_type"
          value={editFormData.animal_type || ''}
          onChange={handleEditChange}
        >
          <option value={"Cat"}>Cat</option>
          <option value={"Dog"}>Dog</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={editFormData.weight || ''}
          onChange={handleEditChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Size</Form.Label>
        <Form.Select
          name="size"
          value={editFormData.size || ''}
          onChange={handleEditChange}
        >
          <option value={"Extra Small"}>Extra Small</option>
          <option value={"Small"}>Small</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Large"}>Large</option>
          <option value={"Extra Large"}>Extra Large</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          name="gender"
          value={editFormData.gender || ''}
          onChange={handleEditChange}
        >
          <option value={"Female"}>Female</option>
          <option value={"Male"}>Male</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Activity Level</Form.Label>
        <Form.Select
          name="activity_level"
          value={editFormData.activity_level || ''}
          onChange={handleEditChange}
        >
          <option value={"Keep Me Inside"}>Keep Me Inside</option>
          <option value={"Some Exercise"}>Some Exercise</option>
          <option value={"Lots of Exercise"}>Lots of Exercise</option>
        </Form.Select>
      </Form.Group>

      <h4 className="mb-3 mt-5">Behavior & Care</h4>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="neutered-checkbox"
          label="Neutered"
          name="neutered"
          checked={editFormData.neutered === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "neutered",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="has_special_needs-checkbox"
          label="Has Special Needs"
          name="has_special_needs"
          checked={editFormData.has_special_needs === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "has_special_needs",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="potty_trained-checkbox"
          label="Potty Trained"
          name="potty_trained"
          checked={editFormData.potty_trained === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "potty_trained",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <h4 className="mb-3 mt-5">Good With</h4>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="good_with_cats-checkbox"
          label="Good with Cats"
          name="good_with_cats"
          checked={editFormData.good_with_cats === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "good_with_cats",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="good_with_dogs-checkbox"
          label="Good with Dogs"
          name="good_with_dogs"
          checked={editFormData.good_with_dogs === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "good_with_dogs",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="good_with_kids-checkbox"
          label="Good with Kids"
          name="good_with_kids"
          checked={editFormData.good_with_kids === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "good_with_kids",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          id="good_with_smallspaces-checkbox"
          label="Good with Small Spaces"
          name="good_with_smallspaces"
          checked={editFormData.good_with_smallspaces === 1}
          onChange={(e) => {
            const newValue = e.target.checked ? 1 : 0;
            handleEditChange({
              target: {
                name: "good_with_smallspaces",
                value: newValue
              }
            });
          }}
        />
      </Form.Group>

      <Button type="submit" className="mt-2 w-100">Save</Button>

    </Form>
    )}
    <Button variant="secondary" className="btn-primary mt-2 w-100" onClick={() => setIsEditing(!isEditing)}>
    {isEditing ? "Cancel" : "Edit Pet Details"}
    </Button>
    </>
  );
}
