import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        axios.post('/api/login', { username, password }).then((response) => {
            setToken(response.data.token);
        }).catch(() => {
            alert('Invalid credentials');
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mr-2"
            />
            <button onClick={login} className="bg-blue-500 text-white p-2">Login</button>
        </div>
    );
};

export default Login;