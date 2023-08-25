import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MessageForm from './MessageForm';
import DeletePost from './DeletePost';
import EditPostForm from './EditPost';
import { useState } from 'react';

const SelectedPost = ({ post, hidePost, onPostDelete, onPostUpdate }) => {
  
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleUpdate = (updatedPost) => {
    setShowEditForm(false);
    onPostUpdate();
    hidePost();
  };

  return (
    <Card style={{ width: '50rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.description}
        </Card.Text>
        <Card.Text>
          Price: {post.price}
        </Card.Text>
        <Card.Text>
          Location: {post.location}
        </Card.Text>
        <Card.Text>
          Will deliver: {post.willDeliver ? "Yes" : "No"}
        </Card.Text>
        <Card.Text>
          Author: {post.author.username}
        </Card.Text>
        
        <div className='button-container'>
          {showMessageForm ? (
          <MessageForm toggleForm={toggleMessageForm} postId={post._id} />
        ) : (
          <Button variant="primary" onClick={toggleMessageForm}>Send Message</Button>
        )}

        {showEditForm ? (
          <EditPostForm post={post} onUpdate={handleUpdate} />
        ) : (
          <Button variant="secondary" onClick={toggleEditForm}>Edit post</Button>
        )}

        <DeletePost postId={post} onPostDelete={onPostDelete} hidePost={hidePost} />
        
        <Button variant="dark" onClick={hidePost}>Back to list</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SelectedPost;
