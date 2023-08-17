import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config";
import MessageForm from "./MessageForm";

export default function SinglePost() {
    const {postId} = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const [showMessageForm, setShowMessageForm] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BASE_URL}/posts/${postId}`)
                const result = await response.json()
                console.log(result)
                if (result.success) {
                    setPost(result.data.post)
                } else {
                    setError(result.error.message)
                }
            } catch (error) {
                setError(error.message)
            }

        }

        fetchPost()
    }, [postId])
    
    if (error) {
        return <div>Error: { error}</div>
    }

    if (!post) {
        return <div>Loading...</div>
    }

    const toggleMessageForm = () => {
        setShowMessageForm(!showMessageForm)
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location}</p>
            <p>Will deliver: {post.willDeliver}</p>
            <p>{post.author.username}</p>
            {
            showMessageForm ? (
                <MessageForm toggleForm={toggleMessageForm} postId={post._Id} />
            ) : (
                <button onClick={toggleMessageForm}>Send Message</button>
            )
            }
            <Link to='/'>Back to list</Link>
        </div>
    )
}