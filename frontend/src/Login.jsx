import { useState } from 'react';
import { authService } from './api/authService';
import { ToastContainer, toast } from "react-toastify";
import Navbar from './Navbar';
import './Login.css'

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await authService.login(login, password);
            toast.success("Вход успешен");
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
            
            <ToastContainer /> 
        </>
    )
}

export default Login
