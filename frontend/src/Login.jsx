import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './api/authService';
import { useAuth } from './context/AuthContext';
import { toast } from "react-toastify";
import Navbar from './Navbar';
import './Login.css'

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const { login: setUser } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            await authService.login(login, password);

            const userData = await authService.getCurrentUser();
            setUser(userData);

            toast.success("Вход выполнен успешно");

            navigate("/");
        } catch (error) {
            const errorDetail = error.response?.data?.detail || "Вход не удался";
            toast.error(errorDetail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <form className="loginForm" onSubmit={handleLogin}>
                <h2>Вход</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="controls">
                    <a href="/" className="backBtn">Назад</a>
                    <button type="submit" className="loginBtn">Войти</button>
                </div>
                {loading && (
                    <div className="loading">Загрузка...</div>
                )}
            </form>
        </>
    )
}

export default Login
