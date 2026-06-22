import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { toast } from "react-toastify";
import Navbar from './Navbar';
import './AddItem.css'
import { itemService } from './api/itemService';

const AddItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [foundAt, setFoundAt] = useState('');

    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    const navigate = useNavigate();

    const handleItemCreation = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Вы должны быть авторизованы");
            return;
        }

        try {
            setLoading(true);

            await itemService.addItem(title, description, foundAt);

            toast.success("Вещь добавлена и размещена!");

            navigate("/");
        } catch (error) {
            const errorDetail = error.response?.data?.detail || "Добавление не удалось";
            toast.error(errorDetail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <form className="itemCreationForm" onSubmit={handleItemCreation}>
                <h2>Спасибо за неравнодушие.<br />Какую вещь вы нашли?</h2>
                <input
                    type="text"
                    placeholder="Название вещи"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Описание (где нашли, приметы и т.д.)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="Found at"
                    value={foundAt}
                    onChange={(e) => setFoundAt(e.target.value)}
                    required
                />
                <div className="controls">
                    <button type="submit" className="createBtn" disabled={loading}>
                        {loading ? "Добавление..." : "Разместить находку"}
                    </button>
                </div>
                {loading && (
                    <div className="loading">Загрузка...</div>
                )}
            </form>
        </>
    )
}

export default AddItem;