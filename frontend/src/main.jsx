import { AuthProvider } from './context/AuthContext';
import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App'
import Login from "./Login";
import SignUp from './SignUp';

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
