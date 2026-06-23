import { useState, useEffect, useCallback } from 'react'
import { itemService } from './api/itemService';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import './App.css'

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            const data = await itemService.searchItems(debouncedSearch, statusFilter);
            setItems(data);
        } catch (err) {
            toast.error("Не удалось загрузить данные");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, statusFilter]);

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

    const handleToggleItemStatus = async (id) => {
        try {
            await itemService.toggleItemStatus(id);
            if (statusFilter === null) {
                setItems(items.map(item =>
                    item.id === id ? { ...item, isActive: !item.isActive } : item
                ));
            } else setTimeout(() => loadItems(), 300);

            toast.success("Статус изменен");
        } catch (err) {
            console.error("Toggle error:", err);
            toast.error(err.response?.data?.detail || "Ошибка переключения статуса");
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

                  <select
                      value={statusFilter === null ? "all" : statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value === "all" ? null : e.target.value)}
                      className="statusFilter"
                  >
                      <option value="all">Все вещи</option>
                      <option value="true">Активные</option>
                      <option value="false">Неактивные</option>
                  </select>
              </div>

              <div className="itemsList">
                  {loading && (
                      <div className="loading">Загрузка...</div>
                  )}
                  {items.map(item => (
                      <div className="itemCard" id={item.id}>
                          <div className="itemInfo">
                              <h2>{item.title} <span style={{ fontWeight: 400, color: "#757575" }}>{!item.isActive && statusFilter === null ? "(найдено)" : ""}</span></h2>
                              <p className="itemDescription">{item.description}</p>
                              <p>Нашедший: {item.foundBy.login} <span>({new Date(item.foundAt).toLocaleString()})</span></p>
                          </div>
                          {item.isOwner && (
                              <div className="controls">
                                  <button className="itemDeleteBtn" onClick={() => handleDeleteItem(item.id)}>
                                  Удалить
                                  </button>
                                  <button className="itemStatusToggleBtn" onClick={() => handleToggleItemStatus(item.id)}>
                                      {item.isActive ? "Не найдена" : "Найдена"}
                                  </button>
                              </div>  
                          )}
                      </div>
                  ))}
            </div>
      </section>
    </>
  )
}

export default App
