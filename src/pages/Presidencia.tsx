import React from "react";
import membro8 from "../assets/8.png";
import membro7 from "../assets/7.png";
import membro6 from "../assets/6.png";
import membro5 from "../assets/5.png";
import membro4 from "../assets/4.png";
import membro3 from "../assets/3.png";
import membro2 from "../assets/2.png";
import membro9 from "../assets/9.png";
import membro14 from "../assets/14.png";
import membro10 from "../assets/10.png";
import membro11 from "../assets/11.png";
import membro12 from "../assets/12.png";
import membro13 from "../assets/13.png";

const diretoria = [
    { nome: "Vitor José Batista Vittorazi", cargo: "Presidente", img: membro8 },
    { nome: "Danilo Gonçalves Belo", cargo: "Vice-presidente", img: membro7 },
    { nome: "Kleyton Roberto Damião", cargo: "Secretário-Geral", img: membro6 },
    { nome: "Eliete Francaro Abdalla", cargo: "Tesoureira", img: membro5 },
    { nome: "Zilene Nayara de Almeida", cargo: "Diretoria de Assuntos Técnicos e Condições de Trabalho", img: membro4 },
    { nome: "Stela Oliveira da Silva", cargo: "Diretoria de Comunicação e Eventos", img: membro3 },
    { nome: "Cláudio Fernandes de Figueiredo", cargo: "Diretoria de Articulação Institucional", img: membro2 },
];

const conselhoDeliberativo = [
    { nome: "Marcus Vinícius Sousa Ventura", cargo: "Advogado", img: membro9 },
    { nome: "Paulo Henrique Martins Rodrigues de Souza", cargo: "Técnico Administrativo", img: membro14 },
    { nome: "Rômulo Mourão de Souza", cargo: "Analista de Sistemas", img: membro10 },
];

const conselhoFiscal = [
    { nome: "Jessica Duarte Maffini", cargo: "Analista Contadora", img: membro11 },
    { nome: "Renata Leite Jansons", cargo: "Analista Contadora", img: membro12 },
    { nome: "Vinícius Mendonça Pacheco", cargo: "Analista Administrador", img: membro13 },
];

const Presidencia = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-6 text-center text-gray-700">
            {/* Título */}
            <h1 className="text-4xl font-bold text-gray-900 mb-12">Diretoria e Conselhos</h1>

            {/* Diretoria */}
            <section>
                <h2 className="text-3xl font-semibold text-blue-600 mb-8">Diretoria</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {diretoria.map((membro, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <img src={membro.img} alt={membro.nome} className="rounded-full mx-auto w-32 h-32 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{membro.nome}</h3>
                            <p className="text-gray-600">{membro.cargo}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Conselho Deliberativo */}
            <section className="mt-16">
                <h2 className="text-3xl font-semibold text-blue-600 mb-8">Conselho Deliberativo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {conselhoDeliberativo.map((membro, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <img src={membro.img} alt={membro.nome} className="rounded-full mx-auto w-32 h-32 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{membro.nome}</h3>
                            <p className="text-gray-600">{membro.cargo}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Conselho Fiscal */}
            <section className="mt-16">
                <h2 className="text-3xl font-semibold text-blue-600 mb-8">Conselho Fiscal</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {conselhoFiscal.map((membro, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <img src={membro.img} alt={membro.nome} className="rounded-full mx-auto w-32 h-32 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{membro.nome}</h3>
                            <p className="text-gray-600">{membro.cargo}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Presidencia;
