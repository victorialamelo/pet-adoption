/*eslint-disable no-unused-vars*/
import { useState } from "react";
import { Table, Button, Card, Image, Form, ListGroup, Container, Row, Col } from "react-bootstrap";
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

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="" />
      </header>

      <section className="dashboard-container row">

          <div className="col-md-6">
            <h1></h1>
            <img src="../src/assets/dogsvg.svg" width={500}  alt="" />
          </div>

          <div className="col-md-6">
            <h1>Organization Dashboard</h1>
            <p>The Paw Portal            </p>
            <p>https://www.instagram.com/thepawportal</p>
            <p>Organization Registration ID</p>
            <p>About Us</p>
            <span>Volunteer-run animal rescue group, connecting shelters with community 🐾</span>
            <Link to="/postpet" className="btn btn-primary w-100">Post a Pet</Link>
          </div>
      </section>

      <section className="dashboard-container row">
      <h1>Pets Posted</h1>
      <div>
      <Table className="pets-table">
        <thead>
          <tr>
            <th colSpan={2}>Pet</th>
            <th>Details</th>
            <th>Date Posted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {samplePets.map((pet) => (
            <>
              <tr key={pet.id}>
                <td rowSpan={3} style={{ width: "150px", textAlign: "center" }}>
                  <Image src="../src/assets/dogsvg.svg" width={100} rounded />
                </td>
                <td rowSpan={3} style={{ verticalAlign: "middle" }}>
                  <strong>{pet.name}</strong>
                </td>
                <td>Age: {pet.age}, Size: {pet.size}, Weight: {pet.weight} lbs</td>
                <td rowSpan={3}>{pet.datePosted}</td>
                <td rowSpan={3}>
                  <select className="form-applicationstatus">
                    <option value="Available">Available</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Archived">Archived</option>
                  </select>
                </td>
                <td rowSpan={3}>
                  <Button variant="warning">Edit Details</Button>{" "}
                  <Button variant="info" onClick={() => setSelectedPet(pet)}>
                    Applicants
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Activity: {pet.activity}, Special Needs: {pet.specialNeeds}</td>
              </tr>
              <tr>
                <td>
                  Potty Trained: {pet.pottyTrained ? "Yes" : "No"}, Neutered: {pet.neutered ? "Yes" : "No"},
                  Good with: {pet.goodWith}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      {selectedPet && (
        <div className="applicants-section">
          <h3>Applicants for {selectedPet.name}</h3>
          <p>
            Age: {selectedPet.age}, Size: {selectedPet.size}, Weight: {selectedPet.weight} lbs, Activity: {selectedPet.activity}
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Contact Info</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedPet.applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.contact}</td>
                  <td>{applicant.dateApplied}</td>
                  <td>
                    <Button variant="primary">Message</Button>{" "}
                    <select>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="secondary" onClick={() => setSelectedPet(null)}>
            Close
          </Button>
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
