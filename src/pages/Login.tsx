import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api"; // Confirme que essa URL está correta no backend

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });

            // Salvar token no localStorage
            localStorage.setItem("token", response.data.token);

            // Limpar erro e redirecionar para admin
            setError("");
            navigate("/admin");
        } catch (err) {
            setError("Usuário ou senha inválidos.");
            console.error("Erro ao fazer login:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-16 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 text-lg border rounded-lg mb-4"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 text-lg border rounded-lg mb-6"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-lg transition duration-300"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
