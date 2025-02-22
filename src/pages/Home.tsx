import React, { useState, useEffect } from "react";
import { Book, FileText, Calculator, ExternalLink } from "lucide-react";

const banners = [
    {
        text1: "ASDPEMAT",
        text2: "Associação dos Servidores Públicos da Defensoria Pública do Estado de Mato Grosso",
    },
];

// 🔹 Seção dinâmica de notícias
const news = [
    {
        title: "Novo plano de carreira para servidores públicos",
        image: "https://source.unsplash.com/400x250/?news",
        link: "#",
    },
    {
        title: "Defensoria amplia serviços de atendimento",
        image: "https://source.unsplash.com/400x250/?law",
        link: "#",
    },
    {
        title: "Evento sobre direitos dos servidores será realizado",
        image: "https://source.unsplash.com/400x250/?meeting",
        link: "#",
    },
];

const services = [
    { name: "Vade Mécum", icon: <Book size={28} />, link: "#" },
    { name: "Simulador de Holerite", icon: <FileText size={28} />, link: "#" },
    { name: "Calculadora Previdenciária", icon: <Calculator size={28} />, link: "#" },
    {
        name: "Portal do Servidor",
        icon: <ExternalLink size={28} />,
        link: "https://www.gp.srv.br/rh_dpemt/servlet/portal_servidor_login?2",
    },
    {
        name: "Lei de Carreira",
        icon: <ExternalLink size={28} />,
        link: "https://iframe.leisestaduais.com.br/mt/lei-ordinaria-n-10773-2018-mato-grosso-dispoe-sobre-a-estrutura-organizacional-o-quadro-de-pessoal-e-o-plano-de-carreiras-de-apoio-administrativo-da-defensoria-publica-do-estado-de-mato-grosso-e-da-outras-providencias?origin=instituicao",
    },
    {
        name: "Estatuto dos Servidores",
        icon: <ExternalLink size={28} />,
        link: "https://app1.sefaz.mt.gov.br/0425762e005567c5/250a3b130089c1cc042572ed0051d0a1/f30bbdee7f310a2e042567bd006ce603",
    },
];

const Home = () => {
    const [bannerIndex, setBannerIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container text-gray-700">
            {/* Hero Section - Retângulo Cinza */}
            <section className="hero relative flex items-center justify-center text-center bg-gray-500 h-[400px]">
                <div className="absolute inset-0 bg-gray-500 opacity-80"></div>
                <div className="relative z-10">
                    <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">{banners[bannerIndex].text1}</h1>
                    <p className="text-2xl font-medium text-white drop-shadow-lg">{banners[bannerIndex].text2}</p>
                </div>
            </section>

            {/* Notícias */}
            <section className="news max-w-7xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Últimas Notícias</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item, i) => (
                        <a
                            key={i}
                            href={item.link}
                            className="news-card bg-blue-600 text-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105"
                        >
                            <img src={item.image} alt="Notícia" className="rounded-lg w-full mb-4" />
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </a>
                    ))}
                </div>
            </section>

            {/* Serviços */}
            <section className="services max-w-7xl mx-auto py-16 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Serviços</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <a
                            key={i}
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-2xl transition transform hover:scale-105"
                        >
                            {service.icon}
                            <span className="text-lg font-semibold">{service.name}</span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
