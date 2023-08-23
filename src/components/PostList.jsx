import { useState, useEffect } from 'react';
import SelectedPost from './SelectedPost';
import Card from 'react-bootstrap/Card';

const PostList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [shouldReload, setShouldReload] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-e/posts`);
        const result = await response.json();
        setData(result);
        setIsLoading(false);
        setShouldReload(false)
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    setShouldReload(false)
    fetchData();
  }, [shouldReload]);

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

  const triggerDataReload = () => {
    setShouldReload(true)
    console.log('reload triggered')
  }

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  return (
    <div className="post-list-container">
      {selectedPost ? (
        <SelectedPost post={selectedPost} hidePost={hidePost} onPostDelete={onPostDelete} onPostUpdate={triggerDataReload} />
      ) : (
        data.data.posts.map((post, index) => (
          <Card key={index} style={{ width: '50rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{post.location}</Card.Subtitle>
              <Card.Text>
                {post.description}
              </Card.Text>
              <Card.Text>
                Price: {post.price}
              </Card.Text>
              <a onClick={() => selectPost(post)} style={{cursor: 'pointer'}}>View Details</a>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default PostList;

