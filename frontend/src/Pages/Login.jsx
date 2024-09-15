import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext'; // Asegúrate de importar el contexto
import { Navigate } from 'react-router-dom';
import '../assets/CSS/Login.css';

const Login = () => {
    const { token } = useContext(UserContext); // Acceder al contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Redirigir si el token es true
    if (token) {
        return <Navigate to="/" />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        alert('Inicio de sesión exitoso!');
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2>Inicio de Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-outline-warning mt-3 fw-bold">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
