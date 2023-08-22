import { BASE_URL } from "../config";


const DeletePost = ({ postId, onPostDelete, hidePost }) => {
    
    const handleDelete = async () => {
        const token = localStorage.getItem('auth-token')

        try {
            const response = await fetch(`${BASE_URL}/posts/${postId._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log('Post deleted successfully:', data)
                onPostDelete(postId._id)
                hidePost() 
    
            } else {
      console.error('Failed to delete post:', data.error)
            }
        } catch (error) {
            console.error('Failed to delete post', error)
        }
    }

    return (
      <div>
        <button onClick={handleDelete}>Delete Post</button>
      </div>
    )
}

export default DeletePost

