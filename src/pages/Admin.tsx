import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login'; // Corrigir o caminho de importação

const Admin = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [news, setNews] = useState([]);
    const [services, setServices] = useState([]);
    const [members, setMembers] = useState([]);
    const [settings, setSettings] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberRole, setMemberRole] = useState('');
    const [settingKey, setSettingKey] = useState('');
    const [settingValue, setSettingValue] = useState('');

    useEffect(() => {
        if (token) {
            axios.get('/api/news', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                setNews(response.data);
            });
            axios.get('/api/services', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                setServices(response.data);
            });
            axios.get('/api/members', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                setMembers(response.data);
            });
            axios.get('/api/settings', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                setSettings(response.data);
            });
        }
    }, [token]);

    const addNews = () => {
        axios.post('/api/news', { title, image, link }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            setNews([...news, response.data]);
            setTitle('');
            setImage('');
            setLink('');
        });
    };

    const addService = () => {
        axios.post('/api/services', { name: serviceName, description: serviceDescription }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            setServices([...services, response.data]);
            setServiceName('');
            setServiceDescription('');
        });
    };

    const addMember = () => {
        axios.post('/api/members', { name: memberName, role: memberRole }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            setMembers([...members, response.data]);
            setMemberName('');
            setMemberRole('');
        });
    };

    const addSetting = () => {
        axios.post('/api/settings', { key: settingKey, value: settingValue }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            setSettings([...settings, response.data]);
            setSettingKey('');
            setSettingValue('');
        });
    };

    if (!token) {
        return <Login setToken={(token) => {
            localStorage.setItem('token', token);
            setToken(token);
        }} />;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Administração</h2>
            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Adicionar Notícia</h3>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Imagem URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={addNews} className="bg-blue-500 text-white p-2">Adicionar Notícia</button>
            </div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Adicionar Serviço</h3>
                <input
                    type="text"
                    placeholder="Nome do Serviço"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Descrição do Serviço"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={addService} className="bg-blue-500 text-white p-2">Adicionar Serviço</button>
            </div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Adicionar Membro</h3>
                <input
                    type="text"
                    placeholder="Nome do Membro"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Função do Membro"
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={addMember} className="bg-blue-500 text-white p-2">Adicionar Membro</button>
            </div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Adicionar Configuração</h3>
                <input
                    type="text"
                    placeholder="Chave"
                    value={settingKey}
                    onChange={(e) => setSettingKey(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Valor"
                    value={settingValue}
                    onChange={(e) => setSettingValue(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={addSetting} className="bg-blue-500 text-white p-2">Adicionar Configuração</button>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Notícias</h3>
                <ul>
                    {news.map((item) => (
                        <li key={item.id} className="mb-2">
                            <h4 className="text-xl">{item.title}</h4>
                            <img src={item.image} alt={item.title} className="w-32 h-32 object-cover" />
                            <a href={item.link} className="text-blue-500">Leia mais</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Serviços</h3>
                <ul>
                    {services.map((item) => (
                        <li key={item.id} className="mb-2">
                            <h4 className="text-xl">{item.name}</h4>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Membros</h3>
                <ul>
                    {members.map((item) => (
                        <li key={item.id} className="mb-2">
                            <h4 className="text-xl">{item.name}</h4>
                            <p>{item.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4">Configurações</h3>
                <ul>
                    {settings.map((item) => (
                        <li key={item.id} className="mb-2">
                            <h4 className="text-xl">{item.key}</h4>
                            <p>{item.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;