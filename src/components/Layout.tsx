import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin"); // Verifica se estamos na página de admin

    return (
        <div className="flex flex-col min-h-screen">
            {/* 🔹 Header Ajustado */}
            <header className="navbar fixed top-0 w-full bg-white py-4 shadow-md z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    {/* 🔹 Nome ASDPEMAT ajustado */}
                    <h1 className="text-3xl font-extrabold tracking-wide text-black">ASDPEMAT</h1>

                    {/* 🔹 Navbar (só aparece se NÃO for a página de Admin) */}
                    {!isAdminPage && (
                        <nav>
                            <ul className="flex space-x-6">
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
                    )}
                </div>
            </header>

            {/* 🔹 Corpo Principal (agora só desloca para a direita no Admin) */}
            <main className={`flex-1 p-6 pt-20 ${isAdminPage ? "ml-56" : ""}`}>
                <Outlet />
            </main>

            {/* 🔹 Footer (só aparece se NÃO for a página de Admin) */}
            {!isAdminPage && (
                <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-auto shadow-inner">
                    <p>© 2025 ASDPEMAT. Todos os direitos reservados.</p>
                </footer>
            )}
        </div>
    );
};

export default Layout;
