import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const ChancLogo = () => (
    <div className="flex items-center space-x-3 p-4">
        <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="text-rose-500"
            >
            <path
                fill="currentColor"
                d="M50,5C25.2,5,5,25.2,5,50s20.2,45,45,45s45-20.2,45-45S74.8,5,50,5z M50,85c-19.3,0-35-15.7-35-35 s15.7-35,35-35s35,15.7,35,35S69.3,85,50,85z"
            />
            <path
                fill="currentColor"
                d="M67.8,32.2C61.3,25.7,50,25.2,50,25.2V15c0,0,14.6-0.5,23.3,8.2c8.7,8.7,8.2,23.3,8.2,23.3h-9.9 C71.6,46.5,74.3,38.7,67.8,32.2z"
            />
        </svg>
        <span className="font-bold text-2xl text-slate-800">CHANC</span>
    </div>
);


const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setOpen }) => {
  const handleNavigation = (page: Page) => {
    setActivePage(page);
    if (window.innerWidth < 768) { // md breakpoint
      setOpen(false);
    }
  };

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
              {item.name}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <div>
              <p className="font-semibold text-slate-800">Juan Pérez</p>
              <a href="#" className="text-sm text-rose-500 hover:underline">Ver Perfil</a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
