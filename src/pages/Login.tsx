import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // 🛑 Hook para redirecionar após login

    const login = async () => {
        setError('');

        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });

            localStorage.setItem('token', response.data.token); // ✅ Salva o token no navegador
            setToken(response.data.token);

            navigate('/admin'); // ✅ Redireciona para a página de administração
        } catch (err) {
            setError('Usuário ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    };

    // Permitir login ao pressionar ENTER
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
                <h2 className="text-3xl font-semibold mb-6">Login</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={login}
                    disabled={loading}
                    className={`w-full text-white py-3 rounded-md transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Entrando...' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Login;
