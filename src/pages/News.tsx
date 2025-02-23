import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('/api/news', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setNews(response.data);
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Gerenciar Notícias</h2>
            <ul>
                {news.map((item) => (
                    <li key={item.id} className="bg-white p-4 mb-2 rounded shadow">
                        <h3 className="text-xl">{item.title}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;
