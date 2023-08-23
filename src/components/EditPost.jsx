
import { BASE_URL } from "../config";
import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const EditPostForm = ({ post, onUpdate }) => {
    const token = localStorage.getItem('auth-token')
  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    description: post.description,
    price: post.price,
    location: post.location,
    willDeliver: post.willDeliver
  });

    const handleSubmit = async (event) => {
      
        const { title, description, price, location, willDeliver } = updatedPost;
        const requestBody = {
            post: {
                title,
                description,
                price,
                location,
                willDeliver
            }
        };
      event.preventDefault();
      const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),  // Updated request body
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Updated:', result);
        onUpdate(result);
      } else {
        console.error(result.error);
      }
    // Call the onUpdate function passed in props to handle the updated post
    onUpdate(updatedPost);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={updatedPost.title}
            onChange={handleChange}
            name="title"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={updatedPost.price}
            onChange={handleChange}
            name="price"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          value={updatedPost.description}
          onChange={handleChange}
          name="description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={updatedPost.location}
          onChange={handleChange}
          name="location"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Will Deliver"
          checked={updatedPost.willDeliver}
          onChange={() =>
            setUpdatedPost((prevPost) => ({
              ...prevPost,
              willDeliver: !prevPost.willDeliver
            }))
          }
          name="willDeliver"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Post
      </Button>
    </Form>
  );
};

export default EditPostForm;