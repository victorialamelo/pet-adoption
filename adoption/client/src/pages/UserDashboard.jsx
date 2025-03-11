/*eslint-disable no-unused-vars*/
import { useState } from "react";
import { Accordion, AccordionItem } from "react-bootstrap";
import { Image, Card, Button, Dropdown, DropdownButton, Form }from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";

export default function UserDashboard({ userType }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Fluffy",
      image: "https://media.istockphoto.com/id/508030340/photo/sunny-cat.jpg",
      datePosted: "2025-02-28",
      requests: [
        {
          id: 101,
          adopterName: "Alice Johnson",
          dateApplied: "2025-03-01",
          status: "Applied",
          chatHistory: [
            { sender: "Alice Johnson", message: "Hi, I'm really interested in adopting Fluffy!", timestamp: "10:00 AM" },
            { sender: "Shelter", message: "Thanks for reaching out! Let's schedule a call.", timestamp: "10:15 AM" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Buddy",
      image: "https://media.istockphoto.com/id/497865882/photo/sitting-dog.jpg",
      datePosted: "2025-02-25",
      requests: [
        {
          id: 102,
          adopterName: "John Doe",
          dateApplied: "2025-02-28",
          status: "Planning Meet & Greet",
          chatHistory: [
            { sender: "John Doe", message: "I love Buddy! When can we meet?", timestamp: "9:00 AM" },
            { sender: "Shelter", message: "Let's set up a meet-and-greet this weekend!", timestamp: "9:30 AM" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Mittens",
      image: "https://media.istockphoto.com/id/1313235374/photo/gray-kitten.jpg",
      datePosted: "2025-03-03",
      requests: []
    }
  ]);


  const [selectedChat, setSelectedChat] = useState(null);
  const [editing, setEditing] = useState(false);

  // SAMPLE ORGANIZATION DATA
  const [profile, setProfile] = useState({
    name: "Protectora BCN",
    website: "https://protectorabcn.es/",
    registrationID: "123-456-789",
    about: "Volunteer-run animal rescue group, connecting shelters with the community 🐾. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus tellus eu leo dictum cursus. Maecenas eleifend libero interdum eleifend condimentum. Fusce justo nibh, mattis sit amet tellus at, pretium ullamcorper augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  });

  // SAMPLE PETS
  const samplePets = [
    {
      id: 1,
      name: "Buddy",
      age: "2 years",
      size: "Medium",
      weight: 30,
      activity: "High",
      specialNeeds: "None",
      pottyTrained: true,
      neutered: true,
      goodWith: ["Cats", "Dogs", "Kids"],
      datePosted: "2025-03-10",
      applicants: [
        {
          id: 1,
          name: "Alice Johnson",
          contact: "alice@example.com",
          dateApplied: "2025-03-05"
        },
        {
          id: 2,
          name: "Bob Smith",
          contact: "bob@example.com",
          dateApplied: "2025-03-06"
        }
      ]
    },
    {
      id: 2,
      name: "Luna",
      age: "3 years",
      size: "Small",
      weight: 15,
      activity: "Medium",
      specialNeeds: "Dietary restrictions",
      pottyTrained: false,
      neutered: true,
      goodWith: ["Dogs"],
      datePosted: "2025-03-08",
      applicants: []
    }
  ];

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    setEditing(false);
  };

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="" />
      </header>

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
              <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.name} website</a>
              <p>Organization Registration ID: {profile.registrationID}</p>
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
      <Accordion defaultActiveKey="0">
        {samplePets.map((pet, index) => (
          <Card key={pet.id}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                <div className="d-flex align-items-center gap-4 w-100">
                  <Image src="../src/assets/dogsvg.svg" width={80} height={80} alt={pet.name} className="rounded" />
                  <div className="flex-1">
                    <h3 className="font-weight-bold">{pet.name}</h3>
                    <p className="text-muted">Age: {pet.age} | Size: {pet.size} | Weight: {pet.weight} lbs</p>
                  </div>
                  <Form.Select defaultValue={pet.status} style={{ width: '130px' }}>
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
                  <p><strong>Good with:</strong> {pet.goodWith}</p>
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="outline-secondary">Edit</Button>
                    <Button variant="primary" onClick={() => setSelectedPet(pet)}>View Applicants</Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>

      {selectedPet && (
        <div className="p-4 border rounded-lg shadow-sm mt-4">
          <h3 className="font-weight-bold">Applicants for {selectedPet.name}</h3>
          <p className="text-muted">Age: {selectedPet.age} | Size: {selectedPet.size} | Weight: {selectedPet.weight} lbs</p>
          <div className="mt-3 space-y-2">
            {selectedPet.applicants.map((applicant) => (
              <div key={applicant.id} className="p-2 border rounded-md d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-weight-medium">{applicant.name}</p>
                  <p className="text-muted">{applicant.contact}</p>
                  <p className="text-muted">Applied on {applicant.dateApplied}</p>
                </div>
                <Form.Select defaultValue="Pending" style={{ width: '120px' }}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
                <Button size="sm" variant="outline-primary">Message</Button>
              </div>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setSelectedPet(null)} className="mt-3">Close</Button>
        </div>
      )}
    </div>
          {/* <>
            <h1>Adopter Dashboard</h1>
            <h2>Favorite Pets</h2>
            <Row className="favorite-pets">
              {pets.map(pet => (
                <Col md={6} key={pet.id}>
                  <Card className="pet-card">
                    <Card.Img variant="top" src="../src/assets/dogsvg.svg" />
                    <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <Button as={Link} to={`/petdetails/${pet.id}`} variant="primary">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <h2 className="mt-4">My Applications</h2>
            {pets.flatMap(pet => pet.requests).length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              <ListGroup className="applications-list">
                {pets.flatMap(pet => pet.requests).map(req => (
                  <ListGroup.Item key={req.id} className="application-item">
                    <strong>{req.adopterName}</strong> - Applied on {req.dateApplied}
                    <Button as={Link} to={`/petdetails/${req.id}`} variant="primary" className="ml-2">View Pet Details</Button>
                    <Button variant="primary" className="ml-2" onClick={() => setSelectedChat(req)}>View Messages</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>



        <div className="chat-panel">
          <h3>Chat with {selectedChat.adopterName}</h3>
          <ListGroup className="chat-history">
            {selectedChat.chatHistory.map((msg, index) => (
              <ListGroup.Item key={index} className={msg.sender === "Shelter" ? "chat-message shelter" : "chat-message adopter"}>
                <strong>{msg.sender}: </strong>{msg.message} <small>{msg.timestamp}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form.Control type="text" placeholder="Type a message..." className="mt-2 chat-input" />
        </div> */}


      </section>
    </>
  );
}
