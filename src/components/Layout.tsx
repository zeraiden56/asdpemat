import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* 🔹 Header Ajustado */}
            <header className="navbar fixed top-0 w-full bg-white py-6 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    {/* 🔹 ASDPEMAT agora maior, mais à esquerda e separado dos menus */}
                    <h1 className="text-3xl font-extrabold tracking-wide text-black ml-16">ASDPEMAT</h1>
                    <nav>
                        <ul className="flex space-x-10">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Quem Somos", path: "/quem-somos" },
                                { name: "Serviços", path: "/servicos" },
                                { name: "Presidência", path: "/presidencia" },
                                { name: "Ferramentas", path: "/ferramentas" },
                                { name: "FAQ", path: "/faq" },
                                { name: "Ajuda", path: "/ajuda" },
                                { name: "Membro", path: "/membro" }
                            ].map((item) => (
                                <li key={item.path} className="relative group">
                                    <Link
                                        to={item.path}
                                        className="text-gray-700 font-semibold text-lg tracking-wide transition duration-300 group-hover:text-blue-800"
                                    >
                                        {item.name}
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="pt-28">{children}</main>

            {/* 🔹 Footer Reimplementado */}
            <footer className="bg-white text-gray-700 text-center py-6 mt-16">
                <p>© 2025 ASDPEMAT. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Layout;
