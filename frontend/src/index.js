import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';


const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </Router>,el);