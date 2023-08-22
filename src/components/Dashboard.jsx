import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth-token');
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        });
        const result = await response.json();
        setUsername(result.data.username);
        setUserId(result.data._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const result = await response.json();
        setPosts(result.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const userPosts = posts.filter(post => post.author._id === userId);
    setUserPosts(userPosts);
  }, [posts, userId]);
    
    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('auth-token')
            try {
                const response = await fetch(`${BASE_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const results = await response.json()
                console.log(results)
                setMessages(results.data.messages)
            } catch (error) {
                console.error(error)
            }
        }

        fetchMessages()
    },[])

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h3>Your Posts:</h3>
      <ul>
        {userPosts.map((post, index) => (
          <li key={index}>
            <h5>{post.title}</h5>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
          </li>
        ))}
          </ul>
          <h3>Your Messages:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
