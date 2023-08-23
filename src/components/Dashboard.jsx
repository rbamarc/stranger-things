import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Logout from './Logout';

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
  }, [posts, userId])
    
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
          <h2 className='welcome-header'>Welcome, {username}!</h2>
          <div className="logout-container">
              <Logout className='logout-button' />
          </div>
      <h3 className='post-header'>Your Posts:</h3>
      <Accordion defaultActiveKey="0">
        {userPosts.map((post, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{post.title}</Accordion.Header>
            <Accordion.Body>
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.location}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <h3 className='message-header'>Your Messages:</h3>
      {messages.map((message, index) => (
        <Card key={index} style={{ width: '50rem', margin: '1rem 0' }}>
          <Card.Body>
            <Card.Text>
              {message.content}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
