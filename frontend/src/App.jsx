import { useState, useEffect, useCallback } from 'react'
import { itemService } from './api/itemService';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import './App.css'

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(true);

    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            const data = await itemService.searchItems(search, status);
            setItems(data);
        } catch (err) {
            toast.error("Не удалось загрузить данные");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [search, status]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

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
              <div className="searchBar">
                  <input
                      type="text"
                      placeholder="Поиск по названию, описанию..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
              </div>

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
