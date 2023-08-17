import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.data.posts.map((post, index) => (
        <li key={index}>
          <Link to={`/posts/${post._id}`}>
            <h5>{post.title}</h5>
          </Link>
          <p>{post.description}</p>
          <p>{post.price}</p>
          <p>{post.location}</p>
        </li>
      ))}
    </div>
  );
};

export default PostList;
