import { useState } from "react";
import { Table, Button, Accordion, Card, Image, Dropdown, Modal, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import "../App.css";

export default function UserDashboard() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Fluffy",
      image: "https://media.istockphoto.com/id/508030340/photo/sunny-cat.jpg?s=612x612&w=0&k=20&c=qkz-Mf32sbJnefRxpB7Fwpcxbp1fozYtJxbQoKvSeGM=",
      size: "Small",
      age: 2,
      weight: 5,
      status: "Available",
      requests: [
        {
          id: 101,
          adopterMessage: "I'm really interested in adopting Fluffy!",
          status: "Applied",
          dateApplied: "2025-03-01",
        },
        {
          id: 102,
          adopterMessage: "I'd love to give Fluffy a forever home!",
          status: "Pending Approval",
          dateApplied: "2025-03-02",
        },
      ],
    },
    {
      id: 2,
      name: "Max",
      image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/scruffy-puppy-christine-tyson.jpg",
      size: "Large",
      age: 4,
      weight: 20,
      status: "Adopted",
      requests: [
        {
          id: 103,
          adopterMessage: "Max would be a great fit for our family!",
          status: "Adoption in Progress",
          dateApplied: "2025-02-28",
        },
      ],
    },
  ]);

  const [setSortBy] = useState("dateApplied");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleStatusChange = (petId, requestId, newStatus) => {
    setPets((prevPets) =>
      prevPets.map((pet) => {
        if (pet.id === petId) {
          return {
            ...pet,
            requests: pet.requests.map((req) =>
              req.id === requestId ? { ...req, status: newStatus } : req
            ),
          };
        }
        return pet;
      })
    );
  };

  const handleArchivePet = (petId) => {
    setPets((prevPets) => prevPets.map((pet) => (pet.id === petId ? { ...pet, status: "Archived" } : pet)));
  };

  const handleSortChange = (field) => {
    setSortBy(field);
    setPets((prevPets) =>
      [...prevPets].sort((a, b) => {
        if (field === "dateApplied") {
          return new Date(b.requests[0]?.dateApplied) - new Date(a.requests[0]?.dateApplied);
        }
        return a[field] > b[field] ? 1 : -1;
      })
    );
  };

  const inboxRequests = pets.flatMap((pet) =>
    pet.requests.filter((req) => req.status === "Applied").map((req) => ({ petName: pet.name, petId: pet.id, ...req }))
  );

  const handleRespond = (request) => {
    setSelectedRequest(request);
  };

  const handleSendResponse = () => {
    if (selectedRequest) {
      handleStatusChange(selectedRequest.petId, selectedRequest.id, "Pending Approval");
      setSelectedRequest(null);
      setResponseMessage("");
    }
  };

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="" />
      </header>

      <section className="container-fluid user-dashboard">
        <h1 className="display-4 text-center mb-4">User Dashboard</h1>

        {/* Inbox Section */}
        <h2 className="h4">Inbox</h2>
        <ul className="list-group mb-4">
          {inboxRequests.length > 0 ? (
            inboxRequests.map((req) => (
              <li key={req.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{req.petName}</strong>: {req.adopterMessage} (Applied on {req.dateApplied})
                </span>
                <Button variant="primary" onClick={() => handleRespond(req)}>Respond</Button>
              </li>
            ))
          ) : (
            <li className="list-group-item">No new requests</li>
          )}
        </ul>

        {/* Sort Dropdown */}
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary">Sort By</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortChange("name")}>Pet Name</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("status")}>Status</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("dateApplied")}>Date Applied</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Posted Pets Section */}
        <h2 className="h4">Posted Pets</h2>
        <Accordion>
          {pets.map((pet) => (
            <Accordion.Item eventKey={pet.id.toString()} key={pet.id}>
              <Accordion.Header>
                <Image src={pet.image} rounded width={200} className="me-3" />
                {pet.name} ({pet.status})
              </Accordion.Header>
              <Accordion.Body>
                <Button variant="link" href={`/pet-details/${pet.id}`}>Edit Pet Details</Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Adopter Message</th>
                      <th>Status</th>
                      <th>Date Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.requests.map((req) => (
                      <tr key={req.id}>
                        <td>{req.adopterMessage}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="light">{req.status}</Dropdown.Toggle>
                            <Dropdown.Menu>
                              {["Applied", "Pending Approval", "Adoption in Progress", "Adopted"].map((status) => (
                                <Dropdown.Item
                                  key={status}
                                  onClick={() => handleStatusChange(pet.id, req.id, status)}
                                >
                                  {status}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{req.dateApplied}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="danger" onClick={() => handleArchivePet(pet.id)}>
                  Mark as Adopted / Archive
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      {/* Response Modal */}
      <Modal show={!!selectedRequest} onHide={() => setSelectedRequest(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Respond to {selectedRequest?.petName}'s Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" value={responseMessage} onChange={(e) => setResponseMessage(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRequest(null)}>Cancel</Button>
          <Button variant="primary" onClick={handleSendResponse}>Send & Update Status</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
