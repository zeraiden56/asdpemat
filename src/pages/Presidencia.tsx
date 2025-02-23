import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "http://localhost:5000/api";

const Presidencia = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${apiURL}/sections?title=Presidência`);
                if (response.data.length > 0) {
                    setContent(response.data[0].content);
                }
            } catch (error) {
                console.error("Erro ao buscar conteúdo da Presidência:", error);
            }
        };

        fetchContent();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 text-center text-gray-700">
            <h1 className="text-4xl font-bold text-gray-900 mb-12">Presidência</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} className="text-lg text-gray-800"></div>
        </div>
    );
};

export default Presidencia;
