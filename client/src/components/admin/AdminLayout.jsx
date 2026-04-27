import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    FileText, 
    Users, 
    MessageSquare, 
    LogOut,
    Sun,
    Settings,
    Menu,
    X
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { title: 'Leads', icon: <Users size={20} />, path: '/admin/leads' },
        { title: 'Inquiries', icon: <MessageSquare size={20} />, path: '/admin/inquiries' },
        { title: 'Blogs', icon: <FileText size={20} />, path: '/admin/blogs' },
    ];

    const handleLogout = () => {
        // Clear local storage/session and redirect
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 fixed h-full">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <Sun className="text-slate-900" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Solynora <span className="text-yellow-500 text-sm">Admin</span></span>
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                                location.pathname === item.path 
                                ? 'bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className={`${location.pathname === item.path ? 'text-slate-900' : 'text-slate-500 group-hover:text-yellow-500'}`}>
                                {item.icon}
                            </span>
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full px-4 py-3.5 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow lg:ml-72 min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 flex items-center justify-between lg:justify-end">
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold">Solynora Admin</span>
                            <span className="text-xs text-slate-500">Super Admin</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-yellow-500 font-bold">
                            SA
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10">
                    {children}
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-900 p-6 flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                    <Sun className="text-slate-900" size={18} />
                                </div>
                                <span className="font-bold">Solynora Admin</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400">
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-grow space-y-2">
                            {menuItems.map((item) => (
                                <Link 
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                        location.pathname === item.path 
                                        ? 'bg-yellow-500 text-slate-900 font-bold' 
                                        : 'text-slate-400 hover:bg-slate-800'
                                    }`}
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            ))}
                        </nav>

                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
