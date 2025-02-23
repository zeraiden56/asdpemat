import { useState, useEffect } from "react";
import axios from "axios";

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image?: string;
}

const banners = [
    {
        text1: "ASDPEMAT",
        text2: "Associação dos Servidores Públicos da Defensoria Pública do Estado de Mato Grosso",
    },
];

const Home = () => {
    const [bannerIndex, setBannerIndex] = useState(0);
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/news")
            .then(response => setNews(Array.isArray(response.data) ? response.data : []))
            .catch(error => console.error("Erro ao carregar notícias:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container text-gray-700">
            {/* Hero Section */}
            <section className="hero relative flex items-center justify-center text-center bg-gray-500 h-[400px]">
                <div className="absolute inset-0 bg-gray-500 opacity-80"></div>
                <div className="relative z-10">
                    <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">{banners[bannerIndex].text1}</h1>
                    <p className="text-2xl font-medium text-white drop-shadow-lg">{banners[bannerIndex].text2}</p>
                </div>
            </section>

            {/* Últimas Notícias com Layout Alternado */}
            <section className="news max-w-7xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.map((item, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105`}>
                            {item.image && <img src={item.image} alt="Notícia" className="w-full md:w-1/2 rounded-lg object-cover" />}
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
