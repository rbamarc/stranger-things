import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../config';

const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [userData, setUserData] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('auth-token')
                if (!token) {
                    navigate('/login')
                    return
                }
                const response = await fetch(`${BASE_URL}/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
                const results = await response.json()
                setUserData(results)

                const userPostResponse = await fetch(`${BASE_URL}/users/${results.data.id}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const userPostResults = await userPostResponse.json()
                setPosts(userPostResults)
            } catch (error) {
                console.log('Error fetching user data', error)
            }
        }
        fetchUserData()
    },[])
  
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Welcome, {userData ? userData.username : 'loading...'}</h2>
      <h3>Your Posts:</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h5>{post.title}</h5>
            <p>{post.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;