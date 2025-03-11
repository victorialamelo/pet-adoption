/*eslint-disable no-unused-vars*/
import { useState } from "react";
import { Table, Button, Card, Image, Form, ListGroup, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../App.css";

export default function UserDashboard({ userType }) {
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
      <Table striped bordered hover className="pets-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Date Posted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet.id}>
              <td><Image src="../src/assets/dogsvg.svg" width={50} rounded /></td>
              <td>{pet.name}</td>
              <td>{pet.datePosted}</td>
              <td>
                <select
                    className="form-applicationstatus"
                    id="applicationstatus"
                    name="applicationstatus"
                    value="applicationstatus"
                    onChange=""
                  >
                    <option value="Available">Available</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Archived">Archived</option>
                </select>
              </td>
              <td>
                <Button variant="btn btn-primary warning">Edit Details</Button>{' '}
                <Button variant="btn btn-primary info">Applicants</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
            <h1>Adoption Requests</h1>
            {pets.flatMap(pet => pet.requests).length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              <ListGroup className="requests-list">
                {pets.flatMap(pet => pet.requests).map(req => (
                  <ListGroup.Item key={req.id} className="request-item">
                    <strong>{req.adopterName}</strong> - Applied on {req.dateApplied}
                    <Button variant="primary" className="ml-2" onClick={() => setSelectedChat(req)}>View Messages</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

          <>
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



        {/* <div className="chat-panel">
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
