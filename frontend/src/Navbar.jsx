import { Link } from 'react-router-dom'
import defaultAvatar from './assets/defaultAvatar.png';
import './Navbar.css';

const Navbar = () => {
    return (

        <nav className="navbar">
            <div className="navbar-left">
                <div className="avatarContainer">
                    <img src={defaultAvatar}></img>
                </div>
                <Link to="/" className="main">
                    Главная
                </Link>
                <Link to="/login" className="main">
                    Войти
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;