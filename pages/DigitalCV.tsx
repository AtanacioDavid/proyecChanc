import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { UserProfile, CVProject, Recommendation, Education } from '../types';

const initialProfile: UserProfile = {
    name: 'Juan Pérez',
    email: 'ejemplo@mail.com',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    interests: ['Desarrollo Sostenible', 'Tecnología Cívica', 'Inteligencia Artificial'],
    education: [{ institution: 'Universidad Nacional', degree: 'Ingeniería en Sistemas', year: '2024' }],
    projects: [
        { id: 1, name: 'EcoTech', role: 'Líder', startDate: '2023-01-15', endDate: '2023-12-20' },
        { id: 2, name: 'ArteUrbano', role: 'Líder', startDate: '2024-02-01', endDate: 'Presente' }
    ],
    recommendations: [{ id: 1, peerName: 'Ana Gómez', skill: 'Liderazgo y gestión de equipos' }]
};


const DigitalCV: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setProfile(p => ({...p, photoUrl: URL.createObjectURL(e.target.files[0])}));
        } else {
            setFileName('');
        }
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
        <div className="flex items-start space-x-6">
            <img src={profile.photoUrl} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"/>
            <div>
                <h2 className="text-3xl font-bold text-slate-800">{profile.name}</h2>
                <p className="text-slate-600">{profile.email}</p>
            </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Intereses</h3>
        <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
                <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">{interest}</span>
            ))}
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
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Mis Proyectos en Chance</h2>
         <div className="space-y-4">
            {profile.projects.map(proj => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <p className="font-bold text-slate-800">{proj.name}</p>
                    <p className="text-sm text-slate-600">Rol: {proj.role}</p>
                    <p className="text-xs text-slate-400">{proj.startDate} - {proj.endDate}</p>
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