
import { useState } from 'react';
import { BASE_URL } from '../config';

const MessageForm = ({ toggleForm, postId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token')
      const data = {
          message: {
            content: message
        }
      }
      try {
          const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`
              },
              body: JSON.stringify(data)
          })

          const results = await response.json()

          if (results.success) {
              alert('Message sent successfully')
              toggleForm()
          }
      } catch (error) {
          alert(`Error sending message: ${error.message}`)
      }
      
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      ></textarea>
      <button onClick={handleSubmit}>Send</button>
      <button onClick={toggleForm}>Cancel</button>
    </div>
  );
};

export default MessageForm;
