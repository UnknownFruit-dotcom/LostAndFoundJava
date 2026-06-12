import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { itemService } from './api/itemService';
import { ToastContainer, toast } from 'react-toastify';
import './App.css'

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const data = await itemService.getAllItems();
                setItems(data);
                setError(null);
            } catch (err) {
                setError("Не удалось загрузить данные");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    const handleDeleteItem = async (id) => {
        try {
            await itemService.deleteItem(id);
            setItems(items.filter(item => item.id !== id));
            toast.success("Удалено");
        } catch (err) {
            console.error("Delete error:", err);
            toast.error(err.response?.data?.detail || "Ошибка удаления");
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
  return (
      <>
      <section id="center">
            <div className="itemsList">
                    {items.map(item => (
                        <div className="itemCard" id={item.id}>
                            <div className="itemInfo">
                                <p>{item.title}</p>
                                <p>Нашедший: {item.foundBy.login}</p>
                            </div>
                            {item.isOwner && (
                                <button className="itemDeleteBtn" onClick={() => handleDeleteItem(item.id)}>
                                    Удалить
                                </button>
                            )}
                        </div>
                    ))}
            </div>
      </section>

        <Link to="/auth/login" className="toLogin">Войдите, чтобы размещать вещи</Link>
        <ToastContainer />
    </>
  )
}

export default App
