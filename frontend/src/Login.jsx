import { useState } from 'react';
import { authService } from './api/authService';
import { ToastContainer, toast } from "react-toastify";
import './Login.css'

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login(login, password);
            toast.success("Вход успешен");
        } catch (error) {
            const errorDetail = error.response?.data?.detail || "Ошибка входа";
            toast.error(errorDetail);
        }
    };

    return (
        <>
            <form id="center" onSubmit={handleLogin}>
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
            </form>
            <ToastContainer /> 
        </>
    )
}

export default Login
