import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Pencil, Trash2, Home, Users, Briefcase, BookOpen, HelpCircle, UserCheck, FileText } from "lucide-react";

const apiURL = "http://localhost:5000/api";

interface Section {
    id: number;
    title: string;
    content: string;
}

const Admin = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [activeSection, setActiveSection] = useState<string>("Notícias");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchSections();
        }
    }, [token]);

    const fetchSections = async () => {
        try {
            const response = await axios.get(`${apiURL}/sections`);
            setSections(response.data);
        } catch (error) {
            console.error("Erro ao carregar seções:", error);
        }
    };

    const handleSaveSection = async () => {
        if (!title || !content) {
            alert("Título e conteúdo são obrigatórios.");
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (editingSection) {
                await axios.put(`${apiURL}/sections/${editingSection.id}`, { title, content }, { headers });
            } else {
                await axios.post(`${apiURL}/sections`, { title, content }, { headers });
            }
            fetchSections();
            setTitle("");
            setContent("");
            setEditingSection(null);
        } catch (error) {
            console.error("Erro ao salvar seção:", error);
        }
    };

    const handleEditSection = (section: Section) => {
        setEditingSection(section);
        setTitle(section.title);
        setContent(section.content);
    };

    const handleDeleteSection = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta seção?")) {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                await axios.delete(`${apiURL}/sections/${id}`, { headers });
                fetchSections();
            } catch (error) {
                console.error("Erro ao excluir seção:", error);
            }
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
                    {[
                        { name: "Quem Somos", icon: <Users size={18} /> },
                        { name: "Serviços", icon: <Briefcase size={18} /> },
                        { name: "Presidência", icon: <Home size={18} /> },
                        { name: "Ferramentas", icon: <FileText size={18} /> },
                        { name: "FAQ", icon: <BookOpen size={18} /> },
                        { name: "Ajuda", icon: <HelpCircle size={18} /> },
                        { name: "Membro", icon: <UserCheck size={18} /> },
                        { name: "Notícias", icon: <FileText size={18} /> },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition ${activeSection === item.name ? "bg-blue-700" : "hover:bg-blue-800"}`}
                            onClick={() => setActiveSection(item.name)}
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
                <h2 className="text-3xl font-bold mb-4">Editar {activeSection}</h2>
                <div className="bg-white p-4 rounded shadow mb-6">
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <ReactQuill value={content} onChange={setContent} className="mb-2" />
                    <button onClick={handleSaveSection} className="bg-green-600 text-white p-2 rounded w-full">
                        {editingSection ? "Salvar Alterações" : "Adicionar Seção"}
                    </button>
                </div>

                {/* Lista de Seções */}
                <h3 className="text-2xl font-bold mb-4">Seções Existentes</h3>
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Título</th>
                            <th className="p-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => (
                            <tr key={section.id} className="border-b">
                                <td className="p-3">{section.title}</td>
                                <td className="p-3 flex space-x-2">
                                    <button onClick={() => handleEditSection(section)} className="text-blue-600">
                                        <Pencil size={20} />
                                    </button>
                                    <button onClick={() => handleDeleteSection(section.id)} className="text-red-600">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Admin;
