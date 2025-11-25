
import React, { useState, useRef, useEffect } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UserProfile, User } from '../types';

// Datos de ejemplo para rellenar el CV inicialmente
const mockInitialData = {
    interests: ['Tecnológico'],
    education: [{ institution: 'Universidad Nacional', degree: 'Ingeniería en Sistemas', year: '2024' }],
    projects: [
        { id: 1, name: 'EcoTech', role: 'Líder', startDate: '2023-01-15', endDate: '2023-12-20', status: 'Ganador Hackathon' },
        { id: 2, name: 'ArteUrbano', role: 'Líder', startDate: '2024-02-01', endDate: 'Presente', status: 'Incubado' }
    ],
    recommendations: [{ id: 1, peerName: 'Ana Gómez', skill: 'Liderazgo y gestión de equipos' }],
    badges: [
        { id: 1, name: 'Innovación Ágil', issuer: 'Globant', icon: '🚀', date: '2023' },
        { id: 2, name: 'Finalista Hackathon 2024', issuer: 'Muni Digital', icon: '🏆', date: '2024' }
    ]
};

const predefinedCategories = ['Social', 'Económico', 'Académico', 'Ambiental', 'Tecnológico', 'Artístico', 'Salud', 'Deportivo'];

const DigitalCV: React.FC = () => {
    // Estado inicial seguro
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Usuario Invitado',
        email: 'invitado@chance.app',
        photoUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
        ...mockInitialData
    } as UserProfile); // Casting para facilitar el MVP

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Efecto para cargar los datos del usuario REAL logueado
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const realUser: User = JSON.parse(storedUser);
            setProfile(prev => ({
                ...prev,
                name: realUser.name,
                email: realUser.email,
                // Mantenemos la foto aleatoria si no tiene una real guardada en BD, 
                // o usamos una por defecto basada en el nombre para que sea consistente
                photoUrl: prev.photoUrl.includes('randomuser') ? `https://ui-avatars.com/api/?name=${realUser.name}&background=f43f5e&color=fff&size=128` : prev.photoUrl
            }));
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setProfile(p => ({...p, photoUrl: imageUrl}));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const toggleInterest = (interest: string) => {
        setProfile(prev => {
            const exists = prev.interests.includes(interest);
            if (exists) {
                return { ...prev, interests: prev.interests.filter(i => i !== interest) };
            } else {
                return { ...prev, interests: [...prev.interests, interest] };
            }
        });
    };

    const handlePrint = () => {
        window.print();
    }

  return (
    <div className="space-y-8" id="cv-section">
      <HeaderBanner 
        title='"Tu historia no está en tu título, está en lo que creas."'
      />

      <Card>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
                <img 
                    src={profile.photoUrl} 
                    alt="Foto de perfil" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-slate-200"
                />
                <div 
                    onClick={triggerFileInput}
                    className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <span className="text-white text-sm font-bold">Cambiar Foto</span>
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
                <p className="text-slate-600">{profile.email}</p>
                <p className="text-sm text-slate-400 mt-2 italic">Este es tu perfil público visible para empresas.</p>
            </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Validaciones e Insignias 🏅</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="text-3xl">{badge.icon}</div>
                    <div>
                        <h4 className="font-bold text-amber-900">{badge.name}</h4>
                        <p className="text-xs text-amber-700">Otorgado por: {badge.issuer} ({badge.date})</p>
                    </div>
                </div>
            ))}
        </div>
      </Card>
      
      <Card>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Mis Intereses</h3>
        <p className="text-slate-500 mb-4 text-sm">Selecciona las áreas que definen tu perfil:</p>
        <div className="flex flex-wrap gap-2">
            {predefinedCategories.map((category) => {
                const isSelected = profile.interests.includes(category);
                return (
                    <button
                        key={category}
                        onClick={() => toggleInterest(category)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors border ${
                            isSelected 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                        {category} {isSelected && '✓'}
                    </button>
                );
            })}
        </div>
      </Card>
      
      <Card>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Formación Académica</h3>
        <div className="space-y-3">
             {profile.education.map((edu, index) => (
                <div key={index}>
                    <p className="font-semibold text-slate-700">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.institution} - {edu.year}</p>
                </div>
             ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Experiencia en Proyectos</h2>
         <div className="space-y-4">
            {profile.projects.map(proj => (
                <div key={proj.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lg text-slate-800">{proj.name}</p>
                            <p className="text-sm text-slate-600">Rol: {proj.role}</p>
                        </div>
                        {proj.status && (
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                proj.status === 'Ganador Hackathon' ? 'bg-yellow-100 text-yellow-800' :
                                proj.status === 'Incubado' ? 'bg-purple-100 text-purple-800' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {proj.status}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{proj.startDate} - {proj.endDate}</p>
                </div>
            ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Recomendaciones Recibidas</h2>
        <div className="space-y-4">
            {profile.recommendations.map(rec => (
                 <div key={rec.id} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <p className="text-slate-700">"<span className="italic">{rec.skill}</span>"</p>
                    <p className="text-sm text-right font-semibold text-slate-500 mt-1">- {rec.peerName}</p>
                </div>
            ))}
        </div>
      </Card>

      <div className="flex justify-end gap-4 mt-8 print:hidden">
        <Button onClick={handlePrint} variant="secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 inline"><path d="M6 18h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2Z"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="2"/></svg>
            Imprimir CV
        </Button>
        <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 inline"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Compartir CV
        </Button>
      </div>

       <style>{`
        @media print {
            body { margin: 0; padding: 0; }
            .flex.h-screen, .md\:hidden, nav { display: none; }
            main { overflow: visible; height: auto; padding: 0 !important; margin: 0 !important;}
            #cv-section { display: block; }
            .print\\:hidden { display: none; }
            div { box-shadow: none !important; border: 1px solid #ccc !important; }
        }
      `}</style>

    </div>
  );
};

export default DigitalCV;
