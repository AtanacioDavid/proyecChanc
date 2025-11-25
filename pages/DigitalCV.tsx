
import React, { useState, useEffect } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UserProfile, User } from '../types';

// Datos de ejemplo para rellenar el historial del CV
const mockProjectHistory = [
    { id: 1, name: 'EcoTech', role: 'Líder', startDate: '2023-01-15', endDate: '2023-12-20', status: 'Ganador Hackathon' },
    { id: 2, name: 'ArteUrbano', role: 'Colaborador', startDate: '2024-02-01', endDate: 'Presente', status: 'Incubado' }
];

const mockBadges = [
    { id: 1, name: 'Innovación Ágil', issuer: 'Globant', icon: '🚀', date: '2023' },
    { id: 2, name: 'Finalista Hackathon 2024', issuer: 'Muni Digital', icon: '🏆', date: '2024' }
];

// Simulamos habilidades blandas validadas por pares para el demo
const mockSoftSkills = ["Liderazgo 🦁", "Comunicación 🗣️", "Trabajo en Equipo 🤝", "Resiliencia 🛡️"];

const DigitalCV: React.FC = () => {
    // Estado inicial
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Usuario',
        email: '',
        photoUrl: '',
        bio: '',
        location: '',
        interests: [],
        education: [],
        projects: mockProjectHistory as any,
        recommendations: [{ id: 1, peerName: 'Ana Gómez', skill: 'Liderazgo y gestión de equipos' }],
        badges: mockBadges,
        softSkills: mockSoftSkills // Inicializamos con datos mock para que el usuario vea el resultado
    });

    // Cargar datos REALES del usuario configurados en el Perfil
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const realUser: User = JSON.parse(storedUser);
            setProfile(prev => ({
                ...prev,
                name: realUser.name,
                email: realUser.email,
                photoUrl: realUser.photoUrl || `https://ui-avatars.com/api/?name=${realUser.name}&background=f43f5e&color=fff&size=128`,
                bio: realUser.bio || 'Sin biografía definida aún.',
                location: realUser.location || 'Ubicación no especificada',
                interests: realUser.interests || [],
                education: realUser.education || [],
                // Si el usuario ya tiene softSkills guardados, úsalos, sino usa los mock para el demo
                softSkills: realUser.softSkills || mockSoftSkills 
            }));
        }
    }, []);

    const handlePrint = () => {
        window.print();
    }

  return (
    <div className="space-y-8" id="cv-section">
      <HeaderBanner 
        title='"Tu historia no está en tu título, está en lo que creas."'
        subtitle="Esta es tu hoja de vida profesional pública. Configura tus datos personales y académicos desde la sección 'Perfil'."
      />

      <Card className="border-l-4 border-teal-500">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="shrink-0">
                <img 
                    src={profile.photoUrl} 
                    alt="Foto de perfil" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-slate-200"
                />
            </div>
            <div className="text-center md:text-left flex-1">
                <h2 className="text-4xl font-bold text-slate-800">{profile.name}</h2>
                <div className="flex flex-col md:flex-row gap-4 mt-2 justify-center md:justify-start text-slate-600 text-sm">
                    <p>📧 {profile.email}</p>
                    <p>📍 {profile.location}</p>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 italic text-slate-700">
                    "{profile.bio}"
                </div>
                
                {profile.interests.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                        {profile.interests.map(interest => (
                            <span key={interest} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wide rounded">
                                {interest}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span>🏅</span> Validaciones e Insignias
            </h3>
            <div className="space-y-3">
                {profile.badges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                            <h4 className="font-bold text-amber-900 text-sm">{badge.name}</h4>
                            <p className="text-xs text-amber-700">{badge.issuer} • {badge.date}</p>
                        </div>
                    </div>
                ))}
            </div>
          </Card>
          
          <Card>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span>🎓</span> Formación Académica
            </h3>
            <div className="space-y-4">
                 {profile.education.length > 0 ? (
                     profile.education.map((edu, index) => (
                        <div key={index} className="pl-4 border-l-2 border-slate-200">
                            <p className="font-bold text-slate-700">{edu.degree}</p>
                            <p className="text-sm text-slate-500">{edu.institution}</p>
                            <p className="text-xs text-slate-400">{edu.year}</p>
                        </div>
                     ))
                 ) : (
                     <div className="text-center p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                         <p className="text-slate-500 text-sm mb-2">No has agregado formación académica.</p>
                         <p className="text-xs text-rose-500">Ve a Perfil para completar esta sección.</p>
                     </div>
                 )}
            </div>
          </Card>
      </div>
      
      {/* NUEVA SECCIÓN: ADN Profesional (Soft Skills) */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              🧠 ADN Profesional (Soft Skills)
          </h2>
          <p className="text-sm text-indigo-700 mb-6">Habilidades interpersonales validadas por equipos de proyecto.</p>
          
          <div className="flex flex-wrap gap-3">
              {profile.softSkills && profile.softSkills.length > 0 ? (
                  profile.softSkills.map((skill, index) => (
                      <div key={index} className="bg-white border border-indigo-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                          <span className="font-bold text-indigo-800">{skill}</span>
                          <span className="bg-indigo-100 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Validado</span>
                      </div>
                  ))
              ) : (
                  <p className="text-indigo-400 italic">Aún no tienes habilidades blandas validadas.</p>
              )}
          </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Experiencia en Proyectos</h2>
         <div className="space-y-4">
            {profile.projects.map(proj => (
                <div key={proj.id} className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-rose-200 transition-colors">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-xl text-slate-800">{proj.name}</p>
                            <p className="text-slate-600 font-medium">{proj.role}</p>
                        </div>
                        {proj.status && (
                            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                                proj.status.includes('Ganador') ? 'bg-yellow-100 text-yellow-800' :
                                proj.status.includes('Incubado') ? 'bg-purple-100 text-purple-800' :
                                'bg-green-100 text-green-800'
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Recomendaciones de Pares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.recommendations.map(rec => (
                 <div key={rec.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl text-rose-300 mb-2">❝</div>
                    <p className="text-slate-700 font-medium italic">{rec.skill}</p>
                    <div className="mt-3 flex items-center justify-end gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-300"></div>
                        <p className="text-xs font-bold text-slate-500 uppercase">{rec.peerName}</p>
                    </div>
                </div>
            ))}
        </div>
      </Card>

      <div className="flex justify-end gap-4 mt-8 print:hidden">
        <Button onClick={handlePrint} variant="secondary">
            Imprimir CV
        </Button>
        <Button>
            Compartir Enlace Público
        </Button>
      </div>

       <style>{`
        @media print {
            body { margin: 0; padding: 0; }
            .flex.h-screen, .md\:hidden, nav, header { display: none; }
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
