import { BASE_URL } from "../config";
import { useState } from "react";

const EditPostForm = ({ post, onUpdate }) => {
    const token = localStorage.getItem('auth-token')
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [price, setPrice] = useState(post.price);  // New state variable

  const handleEdit = async (e) => {
    e.preventDefault();

    const requestBody = {
      post: {
        title,
        description,
        price  
      }
    };

    try {
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
    } catch (error) {
      console.error('Failed to edit post', error);
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input  // New input element
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPostForm;