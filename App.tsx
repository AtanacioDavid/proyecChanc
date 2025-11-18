import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Opportunities from './pages/Opportunities';
import Club from './pages/Club';
import DigitalCV from './pages/DigitalCV';
import Business from './pages/Business';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import { Page, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<Page>('Inicio');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'register'>('landing');

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setActivePage('Inicio');
    } else {
      setAuthMode('landing');
    }
  }, []);

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
    setActivePage('Inicio');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setAuthMode('landing'); // Vuelve a la página de bienvenida al cerrar sesión
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Inicio':
        return <Home setActivePage={setActivePage} />;
      case 'Proyectos':
        return <Projects />;
      case 'Convocatorias':
        return <Opportunities />;
      case 'Club':
        return <Club />;
      case 'CV Digital':
        return <DigitalCV />;
      case 'Chance Business':
        return <Business />;
      case 'Mensajes':
        return <Messages />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  if (!user) {
    switch(authMode) {
      case 'login':
        return <Login onSwitchToRegister={() => setAuthMode('register')} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <Register onSwitchToLogin={() => setAuthMode('login')} onRegisterSuccess={handleLoginSuccess} />;
      case 'landing':
      default:
        return <Landing onSwitchToLogin={() => setAuthMode('login')} onSwitchToRegister={() => setAuthMode('register')} />;
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <div className="md:hidden fixed top-0 left-0 p-4 z-20">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-800">
          <MenuIcon />
        </button>
      </div>
      <Sidebar 
        user={user}
        onLogout={handleLogout}
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        setOpen={setSidebarOpen} 
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;