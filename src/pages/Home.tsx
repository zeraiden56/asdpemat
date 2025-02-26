import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "http://localhost:5000/api";

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image?: string;
}

const Home = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        axios.get(`${apiURL}/news`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setNews(response.data);
                } else {
                    console.error("Resposta inesperada da API", response);
                    setNews([]);
                }
            })
            .catch(error => console.error("Erro ao carregar notícias:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % news.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [news]);

    return (
        <div className="home-container text-gray-700">
            {/* 🔹 Notícia em Destaque (Carrossel) */}
            {news.length > 0 && (
                <div className="relative w-full max-w-4xl mx-auto mt-6">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                        {news.map((item, index) => (
                            <div
                                key={item.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
                                    <h2 className="text-white text-2xl font-bold">{item.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* 🔹 Indicadores do carrossel */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {news.map((_, index) => (
                            <span
                                key={index}
                                className={`h-3 w-3 rounded-full cursor-pointer ${index === activeIndex ? "bg-white" : "bg-gray-400"}`}
                                onClick={() => setActiveIndex(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            )}

            {/* 🔹 Grid de Notícias Secundárias */}
            <section className="max-w-6xl mx-auto py-10 px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.slice(1, 4).map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105">
                            {item.image && (
                                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
