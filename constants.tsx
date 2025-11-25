
import React, { useState } from 'react';

export const ChancLogo = () => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex items-center justify-center notranslate" translate="no">
            {!imgError ? (
                <img 
                    src="/imagen/chancL.png" 
                    alt="Chance Logo" 
                    className="h-24 w-24 object-cover rounded-full shadow-md border-2 border-white"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="flex items-center font-sans font-bold text-2xl tracking-tight text-slate-800">
                    {/* Fallback visual si la imagen falla */}
                    <span className="text-rose-500 mr-1">●</span> CHANCE
                </div>
            )}
        </div>
    );
};

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);
const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
    </svg>
);
const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z"/>
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
);
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
);
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10 9H8"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
    </svg>
);
const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);


export const NAV_ITEMS = [
  { name: 'Inicio', icon: <HomeIcon /> },
  { name: 'Proyectos', icon: <FolderIcon /> },
  { name: 'Convocatorias', icon: <MegaphoneIcon /> },
  { name: 'Mensajes', icon: <MailIcon /> },
  { name: 'Club', icon: <StarIcon /> },
  { name: 'CV Digital', icon: <FileTextIcon /> },
  { name: 'Chance Business', icon: <BriefcaseIcon /> },
] as const;
