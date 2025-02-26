import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "http://localhost:5000/api";

const Presidencia = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`${apiURL}/sections?title=Quem Somos`);
                if (response.data.length > 0) {
                    setContent(response.data[0].content);
                }
            } catch (error) {
                console.error("Erro ao buscar conteúdo:", error);
            }
        };

        fetchContent();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Presidência</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} className="text-lg"></div>
        </div>
    );
};

export default Presidencia;
