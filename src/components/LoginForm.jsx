import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../config";
import { Button, Form } from 'react-bootstrap';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    },
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('auth-token', result.data.token);
                navigate('/dashboard');
            } 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Login
            </Button>
            <p className="mt-3">
                If you don't have an account, you can sign up <Link to="/signup">here</Link>.
            </p>
        </Form>
    );
}
