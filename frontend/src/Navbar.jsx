import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import defaultAvatar from './assets/defaultAvatar.png';
import { useAuth } from './context/AuthContext';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logout();
            navigate("/");
            toast.warning("Вы вышли из аккаунта");
        } catch {
            toast.error("Ошибка в процессе выхода");
        }
    };

    const handleAvatarClick = async () => {
        try {
            toast.warning("Woah! Yeah, that's you.");
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <nav className="navbar">
            <div className="navbar-left">
                <div className="avatarContainer" onClick={handleAvatarClick}>
                    <img src={defaultAvatar}></img>
                </div>

                {user ? (
                    <>
                        <span className="greeting">Привет, {user.login}</span>
                        <button className="logoutBtn" onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
                <Link to="/" className="main">
                    Главная
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;