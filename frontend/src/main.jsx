import { AuthProvider } from './context/AuthProvider';
import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App'
import Login from "./Login";
import SignUp from './SignUp';
import AddItem from './AddItem';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/add-item",
        element: <AddItem />
    }
])

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <React.StrictMode>
            <RouterProvider router={router} />
            <ToastContainer />
        </React.StrictMode>
        
    </AuthProvider>

);
