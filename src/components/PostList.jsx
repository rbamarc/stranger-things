import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-e/posts`);
        const result = await response.json();
        console.log(result)
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
    
  }, []);

  const handlePostClick = (postId) => {
    const post = data.data.posts.find((post) => post._id === postId);
    setSelectedPost(post);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {!selectedPost ? (
        data.data.posts.map((post, index) => (
          <li key={index}>
            <h5 onClick={() => handlePostClick(post._id)}>{post.title}</h5>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
          </li>
        ))
      ) : (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.description}</p>
          <p>Price: {selectedPost.price}</p>
          <p>Location: {selectedPost.location}</p>
          <p>Will deliver: {selectedPost.willDeliver}</p>
          <p>{selectedPost.author.username}</p>
          <button onClick={() => setSelectedPost(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PostList;
