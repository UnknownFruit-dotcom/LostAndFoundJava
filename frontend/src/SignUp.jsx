import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './api/authService';
import { useAuth } from './context/AuthContext';
import { toast } from "react-toastify";
import Navbar from './Navbar';
import './Auth.css'

function SignUp() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const { login: setUser } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const userData = await authService.signUp(login, password);
            setUser(userData);

            toast.success("Регистрация успешна. Добро пожаловать");

            navigate("/");
        } catch (error) {
            const errorDetail = error.response?.data?.detail || "Регистрация не удалась";
            toast.error(errorDetail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <form className="signupForm" onSubmit={handleSignUp}>
                <h2>Создайте аккаунт</h2>
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
                    <button type="submit" className="signupBtn">Создать</button>
                </div>
                {loading && (
                    <div className="loading">Загрузка...</div>
                )}
            </form>
        </>
    )
}

export default SignUp
