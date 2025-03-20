import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { updateUserProfile } from "../backend";

export default function ProfileSection({ profile, setProfile, isPoster = false, isAdopter = false }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  console.log("profile", profile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('user');

      // Prepare data based on user type
      let updateData = {};

      if (isPoster) {
        updateData = {
          entity_name: formData.name,
          entity_website: formData.website,
          entity_registration_id: formData.registrationID
        };
      } else if (isAdopter) {
        updateData = {
          user_name: formData.name,
          email: formData.email,
          phone: formData.phone
        };
      }
      console.log("updateUserProfile userId, updateData", userId, updateData)
      await updateUserProfile(userId, updateData);

      // Update local state with the form data
      setProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Render shelter/organization profile
  if (isPoster) {
    return (
      <div className="row shelter-dashboard">
        <div className="col-md-6">
          <img src="../src/assets/dogsvg.svg" width={500} alt="Dog Logo" />
        </div>
        <div className="col-md-6">
          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <label>Organization Name</label>
              <input
                type="text"
                name="name"
                value={formData.name === 'null' ? "" : formData.name }
                onChange={handleChange}
                className="form-control"
              />
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website === 'null' ? "" : formData.website}
                onChange={handleChange}
                className="form-control"
              />
              <label>Registration ID</label>
              <input
                type="text"
                name="registrationID"
                value={formData.registrationID === 'null' ? "" : formData.registrationID}
                onChange={handleChange}
                className="form-control"
              />
              <button type="submit" className="btn btn-success mt-3 w-100">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-primary mt-2 w-100">Cancel</button>
            </form>
          ) : (
            <>
              <h1>Welcome {profile.name === '' || profile.name === 'null' ? profile.user_name : profile.name}</h1>
              {profile.website !== 'null' && (
                <p>Website: <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
              )}
              {profile.registrationID !== 'null' && (
                <p>Organization Registration ID: {profile.registrationID}</p>
              )}

              <Link to="/postpet" className="btn btn-primary w-100 mt-3">Post a Pet</Link>
              <button onClick={() => setEditing(true)} className="btn btn-primary w-100 mt-3">Edit Profile</button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Render adopter profile
  if (isAdopter) {
    return (
      <>
      <h2>{profile.name === '' ? profile.user_name : profile.name}'s Profile</h2>
      <div className="card">
        <div className="card-body">
          {editing ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Organization Name"
                  value={formData.name === 'null' ? '' : 'test'}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  as="textarea"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell shelters about yourself, your living situation, and why you want to adopt..."
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button type="submit" variant="primary">Save Changes</Button>
                <Button className="btn-primary" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </Form>
          ) : (
            <>
              <div className="mb-4">
                <h5>Name</h5>
                <p>{profile.name || "Not provided"}</p>

                <h5>Contact Information</h5>
                <p>Email: {profile.email || "Not provided"}</p>
                <p>Phone: {profile.phone || "Not provided"}</p>

              </div>

              <Button variant="primary" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
      </>
    );
  }

  // Default empty case
  return null;
}
