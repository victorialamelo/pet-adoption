import { useState, useEffect } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { fetchMessages, sendMessage } from "../backend"; // Assuming these functions exist

export default function MessagingComponent({ petId, petName, ownerId, ownerName, requestId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch messages for this particular pet/request
  useEffect(() => {
    const getMessages = async () => {
      if (!user || !petId || !requestId) return;

      try {
        setLoading(true);
        const response = await fetchMessages(requestId);
        if (response && response.data) {
          setMessages(response.data);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [user, petId, requestId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const messageData = {
        request_id: requestId,
        sender_id: user.id,
        recipient_id: ownerId,
        message: newMessage,
        pet_id: petId
      };

      const response = await sendMessage(messageData);

      if (response && response.data) {
        setMessages([...messages, response.data]);
        setNewMessage("");
        setSuccess("Message sent successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <span>Messages about {petName}</span>
          <span className="small">With {ownerName}</span>
        </div>
      </Card.Header>
      <Card.Body>
        {loading && <p className="text-center">Loading messages...</p>}

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <div className="message-container mb-3" style={{
          maxHeight: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px 0"
        }}>
          {messages.length === 0 ? (
            <p className="text-center text-muted">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message p-2 rounded ${msg.sender_id === user.id ? 'align-self-end bg-light' : 'align-self-start bg-primary text-white'}`}
                style={{ maxWidth: "80%" }}
              >
                <div className="message-content">{msg.message}</div>
                <div className="message-timestamp small mt-1 text-end">
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        <Form onSubmit={handleSendMessage}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={loading || !newMessage.trim()}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
