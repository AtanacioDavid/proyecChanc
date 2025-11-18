import React from 'react';
import { Page, User } from '../types';
import { NAV_ITEMS, ChancLogo } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setOpen, user, onLogout }) => {
  const handleNavigation = (page: Page) => {
    setActivePage(page);
    if (window.innerWidth < 768) { // md breakpoint
      setOpen(false);
    }
  };

  const LogoutIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" x2="9" y1="12" y2="12"/>
      </svg>
  );

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      ></div>

      <aside className={`bg-white text-slate-700 w-64 min-h-screen flex flex-col fixed md:relative z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-slate-200">
          <ChancLogo />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.name);
              }}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activePage === item.name
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'hover:bg-slate-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className={item.name === 'Chance Business' ? 'notranslate' : ''} translate={item.name === 'Chance Business' ? 'no' : undefined}>
                  {item.name}
              </span>
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <div>
              <p className="font-semibold text-slate-800">{user?.name || 'Invitado'}</p>
              <a href="#" onClick={(e) => {e.preventDefault(); setActivePage('CV Digital')}} className="text-sm text-rose-500 hover:underline">Ver Perfil</a>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100"
          >
            <span className="mr-3"><LogoutIcon /></span>
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;