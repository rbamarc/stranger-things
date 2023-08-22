import { useState, useEffect } from 'react';
import SelectedPost from './SelectedPost';

const PostList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-e/posts`);
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectPost = (post) => {
    setSelectedPost(post);
  };

  const hidePost = () => {
    setSelectedPost(null);
  };

  const onPostDelete = (postId) => {
    const updatedData = { ...data };
    updatedData.data.posts = updatedData.data.posts.filter((post) => post._id !== postId);
    setData(updatedData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {selectedPost ? (
        <SelectedPost post={selectedPost} hidePost={hidePost} onPostDelete={onPostDelete} />
      ) : (
        data.data.posts.map((post, index) => (
          <li key={index}>
            <a onClick={() => selectPost(post)}>
              <h5>{post.title}</h5>
            </a>
            <p>{post.description}</p>
            <p>{post.price}</p>
            <p>{post.location}</p>
          </li>
        ))
      )}
    </div>
  );
};

export default PostList;
