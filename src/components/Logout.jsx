import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('auth-token')
        navigate('/login')
    }

    return (
        <button onClick={logout}>Log Out</button>
    )
}