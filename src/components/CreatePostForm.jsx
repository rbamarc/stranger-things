import { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";

export default function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate()
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('auth-token');

        const post = {
            title,
            location,
            willDeliver,
            description,
            price
        };

        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({post})
        });
        const results = await response.json();

        if (results.success) {
            console.log("Post created:", results.data);
            navigate('/')
        } else {
            console.error('Error creating post:', results.error);
        }
    };
    
    return (
        <>
            
            <div>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Enter Title:</p>
            </label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <label>
                <p>Enter Location:</p>
            </label>
            <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
            <label>
                <input
                    type="radio"
                    value={true}
                    checked={willDeliver}
                    onChange={() => setWillDeliver(true)}
                />
                Yes, I will deliver
            </label>
            <label>
                <input
                    type="radio"
                    value={false}
                    checked={!willDeliver}
                    onChange={() => setWillDeliver(false)}
                />
                No, I will not deliver
            </label>
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                <p>Enter Price:</p>
            </label>
            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
            <button type="submit">Submit</button>
         </form>
        </div>
        </>
     );
}
