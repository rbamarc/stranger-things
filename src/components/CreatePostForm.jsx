import { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate()
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('auth-token');

        const post = {
            title,
            location,
            willDeliver,
            description,
            price
        };

        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({post})
        });
        const results = await response.json();

        if (results.success) {
            console.log("Post created:", results.data);
            navigate('/')
        } else {
            console.error('Error creating post:', results.error);
        }
    };
    
    return (
        <>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Will you deliver?</Form.Label>
        <Form.Check
          type="radio"
          label="Yes, I will deliver"
          checked={willDeliver}
          onChange={() => setWillDeliver(true)}
        />
        <Form.Check
          type="radio"
          label="No, I will not deliver"
          checked={!willDeliver}
          onChange={() => setWillDeliver(false)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </>
     );
}
