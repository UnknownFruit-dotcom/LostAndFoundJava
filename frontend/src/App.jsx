import { useState, useEffect } from 'react'
import { itemService } from './api/itemService';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import './App.css'

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const data = await itemService.getAllItems();
                setItems(data);
            } catch (err) {
                toast.error("Не удалось загрузить данные");
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

  return (
      <>
      <Navbar />
      <section id="center">
              <div className="itemsList">
                  {loading && (
                      <div className="loading">Загрузка...</div>
                  )}
                  {items.map(item => (
                      <div className="itemCard" id={item.id}>
                          <div className="itemInfo">
                              <h2>{item.title}</h2>
                              <p className="itemDescription">{item.description}</p>
                              <p>Нашедший: {item.foundBy.login} <span>({new Date(item.foundAt).toLocaleString()})</span></p>
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
    </>
  )
}

export default App
