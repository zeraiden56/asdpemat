import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Pencil, Trash2, Home, Users, Briefcase, BookOpen, HelpCircle, UserCheck, FileText, Image } from "lucide-react";

const apiURL = "http://localhost:5000/api";

interface Section {
    id: number;
    title: string;
    content: string;
    updated_at?: string;
}

const Admin = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [activeSection, setActiveSection] = useState<string>("quem-somos");
    const [content, setContent] = useState<string>("");
    const [history, setHistory] = useState<Section[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchSectionData(activeSection);
        }
    }, [token, activeSection]);

    const fetchSectionData = async (section: string) => {
        try {
            const response = await axios.get(`${apiURL}/${section}`);
            if (response.data.content) {
                setContent(response.data.content);
            } else {
                setContent("");
            }
            if (response.data.history) {
                setHistory(response.data.history);
            }
        } catch (error) {
            console.error(`Erro ao carregar ${section}:`, error);
            setContent("");
        }
    };

    const handleSaveSection = async () => {
        if (!content.trim()) {
            alert("O conteúdo não pode estar vazio!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("content", content);
            if (image) {
                formData.append("image", image);
            }

            const headers = { Authorization: `Bearer ${token}` };
            await axios.post(`${apiURL}/${activeSection}`, formData, { headers });

            alert("Seção salva com sucesso!");
            fetchSectionData(activeSection);
            setImage(null);
        } catch (error) {
            console.error(`Erro ao salvar ${activeSection}:`, error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar fixa */}
            <aside className="w-72 bg-blue-900 text-white flex flex-col justify-between fixed left-0 top-0 h-full p-4">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-4">Painel Admin</h1>
                    {[{ name: "Quem Somos", value: "quem-somos", icon: <Users size={18} /> },
                    { name: "Serviços", value: "servicos", icon: <Briefcase size={18} /> },
                    { name: "Presidência", value: "presidencia", icon: <Home size={18} /> },
                    { name: "Ferramentas", value: "ferramentas", icon: <FileText size={18} /> },
                    { name: "FAQ", value: "faq", icon: <BookOpen size={18} /> },
                    { name: "Ajuda", value: "ajuda", icon: <HelpCircle size={18} /> },
                    { name: "Associe-se", value: "associese", icon: <UserCheck size={18} /> },
                    { name: "Notícias", value: "news", icon: <FileText size={18} /> }].map((item) => (
                        <button
                            key={item.value}
                            className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition ${activeSection === item.value ? "bg-blue-700" : "hover:bg-blue-800"}`}
                            onClick={() => setActiveSection(item.value)}
                        >
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                        </button>
                    ))}
                </div>
                <button onClick={handleLogout} className="bg-red-500 p-4 text-center w-full rounded-lg">Sair</button>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-6 ml-72">
                <h2 className="text-3xl font-bold mb-4">Editar {activeSection.replace("-", " ")}</h2>
                <div className="bg-white p-4 rounded shadow mb-6">
                    <ReactQuill value={content} onChange={setContent} className="mb-2 h-48" />
                    <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="mt-2" />
                    <button onClick={handleSaveSection} className="bg-green-600 text-white p-2 rounded w-full mt-2">
                        Salvar Alterações
                    </button>
                </div>

                {/* Histórico de Alterações */}
                <h3 className="text-2xl font-bold mb-4">Histórico de Alterações</h3>
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Data</th>
                            <th className="p-3 text-left">Conteúdo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((entry) => (
                            <tr key={entry.id} className="border-b">
                                <td className="p-3">{new Date(entry.updated_at || "").toLocaleString()}</td>
                                <td className="p-3">{entry.content.substring(0, 100)}...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Admin;
