import { useState } from "react";
import MessageForm from "./MessageForm";
import DeletePost from "./DeletePost";
import EditPostForm from "./EditPost";
import { useNavigate } from "react-router-dom";

const SelectedPost = ({ post, hidePost, onPostDelete }) => {
  const navigate = useNavigate();  // Initialize the navigate function
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
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Price: {post.price}</p>
      <p>Location: {post.location}</p>
      <p>Will deliver: {post.willDeliver ? "Yes" : "No"}</p>
      <p>{post.author.username}</p>

      {showMessageForm ? (
        <MessageForm toggleForm={toggleMessageForm} postId={post._id} />
      ) : (
        <button onClick={toggleMessageForm}>Send Message</button>
      )}

      {showEditForm ? (
        <EditPostForm post={post} onUpdate={handleUpdate} />
      ) : (
        <button onClick={toggleEditForm}>Edit post</button>
      )}
      
      <DeletePost postId={post} onPostDelete={onPostDelete} hidePost={hidePost} />
      <button onClick={hidePost}>Back to list</button>
    </div>
  );
};

export default SelectedPost;