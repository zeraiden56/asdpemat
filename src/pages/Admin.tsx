import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-5 flex flex-col">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
                <nav>
                    <ul>
                        <li className={`mb-4 p-2 rounded cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-600' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                        <li className={`mb-4 p-2 rounded cursor-pointer ${activeTab === 'news' ? 'bg-blue-600' : ''}`} onClick={() => setActiveTab('news')}>Gerenciar Notícias</li>
                        <li className={`mb-4 p-2 rounded cursor-pointer ${activeTab === 'services' ? 'bg-blue-600' : ''}`} onClick={() => setActiveTab('services')}>Gerenciar Serviços</li>
                        <li className={`mb-4 p-2 rounded cursor-pointer ${activeTab === 'members' ? 'bg-blue-600' : ''}`} onClick={() => setActiveTab('members')}>Gerenciar Membros</li>
                        <li className={`mb-4 p-2 rounded cursor-pointer ${activeTab === 'settings' ? 'bg-blue-600' : ''}`} onClick={() => setActiveTab('settings')}>Configurações</li>
                    </ul>
                </nav>
                <button onClick={logout} className="mt-auto bg-red-500 p-2 rounded text-center">Sair</button>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-6">
                {/* Dashboard */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold">Notícias Publicadas</h3>
                                <p className="text-2xl">10</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold">Serviços Ativos</h3>
                                <p className="text-2xl">5</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold">Membros Registrados</h3>
                                <p className="text-2xl">8</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gerenciar Notícias */}
                {activeTab === 'news' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Gerenciar Notícias</h2>
                        <input type="text" placeholder="Título" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Imagem URL" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Link" className="border p-2 w-full mb-2" />
                        <button className="bg-blue-500 text-white p-2 rounded">Adicionar Notícia</button>
                    </div>
                )}

                {/* Gerenciar Serviços */}
                {activeTab === 'services' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Gerenciar Serviços</h2>
                        <input type="text" placeholder="Nome do Serviço" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Descrição" className="border p-2 w-full mb-2" />
                        <button className="bg-blue-500 text-white p-2 rounded">Adicionar Serviço</button>
                    </div>
                )}

                {/* Gerenciar Membros */}
                {activeTab === 'members' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Gerenciar Membros</h2>
                        <input type="text" placeholder="Nome do Membro" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Cargo" className="border p-2 w-full mb-2" />
                        <button className="bg-blue-500 text-white p-2 rounded">Adicionar Membro</button>
                    </div>
                )}

                {/* Configurações */}
                {activeTab === 'settings' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Configurações</h2>
                        <input type="text" placeholder="Chave" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Valor" className="border p-2 w-full mb-2" />
                        <button className="bg-blue-500 text-white p-2 rounded">Salvar Configuração</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
