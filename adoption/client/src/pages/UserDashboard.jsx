import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "react-bootstrap";
import { Image, Card, Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import NavBar from "../components/NavBar";

import "../App.css";

// Import backend helper functions
import {
fetchUserProfile,
updateUserProfile
//fetchPetsWithRequests,
//updatePetStatus,
//updateRequestStatus
} from "../backend";

export default function UserDashboard() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState(null);
  const [editing, setEditing] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User IDs
  console.log('id', id); // returns id from params
  // console.log('user', user.user_id);

  // User profile state
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    registrationID: "",
    about: "",
  });

  const [formData, setFormData] = useState(profile);

  // Fetch user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (!id) {
          navigate('/login');
          return;
        }

        const userData = await fetchUserProfile(id);

        setProfile({
          name: userData.entity_name || userData.user_name,
          website: userData.entity_website || '',
          registrationID: userData.entity_registration_id || '',
          about: userData.about || ''
        });

        setFormData({
          name: userData.entity_name || userData.user_name,
          website: userData.entity_website || '',
          registrationID: userData.entity_registration_id || '',
          about: userData.about || ''
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again later.");
      }
    };

    loadUserProfile();
  }, [id, navigate]);

  // // Fetch pets posted by the current user
  // useEffect(() => {
  //   const loadUserPets = async () => {
  //     try {
  //       setLoading(true);

  //       const petsWithRequests = await fetchPetsWithRequests();
  //       setPets(petsWithRequests);
  //     } catch (err) {
  //       console.error("Error fetching pets:", err);
  //       setError("Failed to load pets. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUserPets();
  // }, []);

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('userId');

      await updateUserProfile(userId, {
        entity_name: formData.name,
        entity_website: formData.website,
        entity_registration_id: formData.registrationID,
        about: formData.about
      });

      // Update local state with the form data
      setProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  // // Update pet status
  // const handlePetStatusChange = async (petId, newStatus) => {
  //   try {
  //     await updatePetStatus(petId, newStatus);

  //     // Update the local state to reflect the change
  //     setPets(prevPets => prevPets.map(pet =>
  //       pet.id === petId ? { ...pet, status: newStatus } : pet
  //     ));
  //   } catch (err) {
  //     console.error("Error updating pet status:", err);
  //     alert("Failed to update pet status. Please try again.");
  //   }
  // };

  // // Update adoption request status
  // const handleRequestStatusChange = async (requestId, newStatus) => {
  //   try {
  //     await updateRequestStatus(requestId, newStatus);

  //     // Update the local state
  //     setPets(prevPets =>
  //       prevPets.map(pet => ({
  //         ...pet,
  //         applicants: pet.applicants.map(applicant =>
  //           applicant.id === requestId
  //             ? { ...applicant, status: newStatus }
  //             : applicant
  //         )
  //       }))
  //     );
  //   } catch (err) {
  //     console.error("Error updating request status:", err);
  //     alert("Failed to update application status. Please try again.");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container mt-5 text-center">
          <h2>Loading dashboard...</h2>
        </div>
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <NavBar />
        <div className="container mt-5 text-center">
          <h2>Error</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </>
    );
  }


  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="" />
      </header>
      <section className="dashboard-container row">
        <h1>Dashboard</h1>
        <div className="col-md-6">
          <button className="btn btn-primary">Adopt a Pet</button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary">Post a Pet</button>
        </div>
      </section>
      <section className="dashboard-container row">
        <div className="col-md-6">
          <h1>{profile.name} Dashboard</h1>
          <img src="../src/assets/dogsvg.svg" width={500} alt="Dog Logo" />
        </div>
        <div className="col-md-6">
          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-control"
              />
              <label>Registration ID</label>
              <input
                type="text"
                name="registrationID"
                value={formData.registrationID}
                onChange={handleChange}
                className="form-control"
              />
              <label>About Us</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="form-control"
              />
              <button type="submit" className="btn btn-success mt-3 w-100">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary mt-2 w-100">Cancel</button>
            </form>
          ) : (
            <>
              <h1>{profile.name}</h1>
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.name} website</a>
              )}
              {profile.registrationID && (
                <p>Organization Registration ID: {profile.registrationID}</p>
              )}
              <p>About Us</p>
              <span>{profile.about}</span>
              <Link to="/postpet" className="btn btn-primary w-100 mt-5">Post a Pet</Link>
              <button onClick={() => setEditing(true)} className="btn btn-primary w-100 mt-3">Edit Profile</button>
            </>
          )}
        </div>
      </section>
      <section className="dashboard-container row">
        <h1>Posted Peluditos</h1>
        <div className="space-y-4">
          {pets.length === 0 ? (
            <p>No pets posted yet.</p>
          ) : (
            <Accordion defaultActiveKey="0">
              {pets.map((pet, index) => (
                <Card key={pet.id}>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-4 w-100">
                        <Image src={pet.img_url || "../src/assets/dogsvg.svg"} width={80} height={80} alt={pet.name} className="rounded" />
                        <div className="flex-1">
                          <h3 className="font-weight-bold">{pet.name}</h3>
                          <p className="text-muted">Age: {pet.age} | Size: {pet.size} | Weight: {pet.weight} lbs</p>
                        </div>
                        <Form.Select
                          value={pet.status}
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
                      <div className="p-3">
                        <p><strong>Activity:</strong> {pet.activity}</p>
                        <p><strong>Special Needs:</strong> {pet.specialNeeds}</p>
                        <p><strong>Potty Trained:</strong> {pet.pottyTrained ? "Yes" : "No"} | <strong>Neutered:</strong> {pet.neutered ? "Yes" : "No"}</p>
                        <p><strong>Good with:</strong> {pet.goodWith.join(', ')}</p>
                        <div className="d-flex gap-2 mt-3">
                          <Button
                            variant="outline-secondary"
                            onClick={() => navigate(`/editpet/${pet.id}`)}
                          >
                            Edit
                          </Button>
                          <Button variant="primary" onClick={() => setSelectedPet(pet)}>
                            View Applicants {pet.applicants.length > 0 && `(${pet.applicants.length})`}
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Card>
              ))}
            </Accordion>
          )}

          {selectedPet && (
            <div className="p-4 border rounded-lg shadow-sm mt-4">
              <h3 className="font-weight-bold">Applicants for {selectedPet.name}</h3>
              <p className="text-muted">Age: {selectedPet.age} | Size: {selectedPet.size} | Weight: {selectedPet.weight} lbs</p>

              {selectedPet.applicants.length === 0 ? (
                <p>No applicants yet for this pet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {selectedPet.applicants.map((applicant) => (
                    <div key={applicant.id} className="p-2 border rounded-md d-flex justify-content-between align-items-center">
                      <div>
                        <p className="font-weight-medium">{applicant.name}</p>
                        <p className="text-muted">{applicant.contact}</p>
                        <p className="text-muted">Applied on {applicant.dateApplied}</p>
                        {applicant.message && (
                          <p className="fst-italic">"{applicant.message}"</p>
                        )}
                      </div>
                      <Form.Select
                        value={applicant.status || "Pending"}
                        onChange={(e) => handleRequestStatusChange(applicant.id, e.target.value)}
                        style={{ width: '120px' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </Form.Select>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => navigate(`/messages/${applicant.id}`)}
                      >
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="secondary" onClick={() => setSelectedPet(null)} className="mt-3">Close</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
