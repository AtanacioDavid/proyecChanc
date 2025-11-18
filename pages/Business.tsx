
import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { BusinessProject, CompanyChallenge, CommunityProject } from '../types';

// Equipos listos para incubar (Semillero)
const talentSeedbed: BusinessProject[] = [
    {id: 1, title: 'AgriTech Córdoba', teamName: 'Equipo Innovate', description: 'Sensores IoT low-cost probados en campo. Buscamos escalar producción.', status: 'Buscando Incubación', tags: ['Agro', 'IoT']},
    {id: 2, title: 'EduGame', teamName: 'DevLearners', description: 'Plataforma gamificada para escuelas rurales. Prototipo funcional.', status: 'Buscando Inversión', tags: ['EdTech', 'Social']},
];

// Proyectos comunitarios que necesitan padrinos
const communityProjects: CommunityProject[] = [
    {id: 1, title: 'Reciclaje Barrial 2025', description: 'Ganadores del Hackathon Ambiental. Necesitamos contenedores inteligentes.', impact: 'Beneficia a 500 familias', needs: 'Fondos para materiales', location: 'Zona Norte'},
    {id: 2, title: 'Club de Programación Joven', description: 'Espacio gratuito para enseñar código a adolescentes.', impact: '50 becas anuales', needs: 'Notebooks o espacio físico', location: 'Centro'},
];

const companyChallenges: CompanyChallenge[] = [
    {id: 1, title: 'Packaging ecológico', description: 'Alternativas de embalaje sustentable para nuestros proveedores locales.', company: 'SuperVeaDel', deadline: '2025-11-12'},
    {id: 2, title: 'Reducir desperdicio de caucho', description: 'Buscar soluciones innovadoras para reutilizar el caucho sobrante.', company: 'Xinca SRLDel', deadline: '2025-10-30'},
];

const mockCandidates = [
    { id: 1, name: 'Sofía Martinez', skill: 'Marketing', interest: 'Ambiental', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', bio: 'Especialista en redes sociales con enfoque en sustentabilidad. Ganadora Desafío Verde.' },
    { id: 2, name: 'Lucas Gomez', skill: 'Programación', interest: 'Tecnológico', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', bio: 'Desarrollador Full Stack. Creador de app EduGame.' },
    { id: 3, name: 'Carla Ruiz', skill: 'Finanzas', interest: 'Económico', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', bio: 'Contadora con experiencia en startups.' },
    { id: 4, name: 'Miguel Angel', skill: 'Diseño', interest: 'Social', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', bio: 'Diseñador UX/UI enfocado en accesibilidad.' },
];

const Business: React.FC = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [skillFilter, setSkillFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'challenges' | 'incubation' | 'sponsorship'>('incubation');

  const filteredCandidates = mockCandidates.filter(c => 
      c.skill.toLowerCase().includes(skillFilter.toLowerCase()) &&
      c.interest.toLowerCase().includes(interestFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 relative">
        <HeaderBanner 
            title={<span className="notranslate" translate="no">Chance Business</span>}
            subtitle="Conecta con el talento joven, incuba ideas y apadrina proyectos de impacto."
        />

        <div className="flex flex-wrap gap-4 mb-6 border-b border-slate-200 pb-4">
             <button 
                onClick={() => setActiveTab('incubation')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'incubation' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                🌱 Semillero de Talento
             </button>
             <button 
                onClick={() => setActiveTab('sponsorship')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'sponsorship' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                🤝 Apadrinazgo Comunitario
             </button>
             <button 
                onClick={() => setActiveTab('challenges')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'challenges' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                🏢 Desafíos Corporativos
             </button>
        </div>

        {activeTab === 'incubation' && (
            <section className="animate-fade-in">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded-r-lg">
                    <h3 className="font-bold text-purple-900">Incuba el futuro</h3>
                    <p className="text-purple-800">Descubre equipos jóvenes con tracción propia. Ofréceles mentoría y recursos para integrarlos a tu cadena de valor.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {talentSeedbed.map(p => (
                        <Card key={p.id} className="border-2 border-transparent hover:border-purple-200 transition-all">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-xl text-slate-800">{p.title}</h3>
                                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full">{p.status}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-semibold mt-1">Equipo: {p.teamName}</p>
                            <p className="text-slate-600 mt-3">{p.description}</p>
                            <div className="flex gap-2 mt-3">
                                {p.tags?.map(tag => <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{tag}</span>)}
                            </div>
                            <div className="mt-6 flex gap-3">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">Ofrecer Incubación</Button>
                                <Button variant="secondary" onClick={() => setShowInviteModal(true)}>Ver Integrantes</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        )}

        {activeTab === 'sponsorship' && (
            <section className="animate-fade-in">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
                    <h3 className="font-bold text-amber-900">Responsabilidad Social Corporativa</h3>
                    <p className="text-amber-800">Apadrina proyectos nacidos en la comunidad (hackathons, ferias de ciencias) que necesitan un empujón para generar impacto real.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {communityProjects.map(p => (
                        <Card key={p.id}>
                            <h3 className="font-bold text-xl text-slate-800">{p.title}</h3>
                            <div className="mt-3 space-y-2 text-sm">
                                <p className="flex items-center gap-2 text-slate-700">
                                    <span className="text-xl">📍</span> {p.location}
                                </p>
                                <p className="flex items-center gap-2 text-slate-700">
                                    <span className="text-xl">🌍</span> Impacto: <span className="font-semibold">{p.impact}</span>
                                </p>
                                <p className="flex items-center gap-2 text-rose-600">
                                    <span className="text-xl">🆘</span> Necesitan: <span className="font-semibold">{p.needs}</span>
                                </p>
                            </div>
                            <div className="mt-6">
                                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Ser Padrino / Sponsor</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        )}

        {activeTab === 'challenges' && (
            <section className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Desafíos Activos</h2>
                    <Button variant="secondary">+ Publicar Nuevo Desafío</Button>
                </div>
                <div className="space-y-4">
                    {companyChallenges.map(c => (
                        <Card key={c.id}>
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-rose-600">{c.title}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{c.company} - Vence: {c.deadline}</p>
                                    <p className="text-slate-600 max-w-2xl">{c.description}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                                    <Button size="sm" variant="primary">Ver Postulantes</Button>
                                    <Button size="sm" variant="secondary">Editar</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        )}

        {/* Modal de Talento (Reutilizado) */}
        {showInviteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-slate-800">Talento Destacado</h3>
                        <button onClick={() => setShowInviteModal(false)} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                        <h4 className="font-semibold mb-3 text-slate-700">Filtrar Talentos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                                label="Por Habilidad"
                                value={skillFilter}
                                onChange={(e) => setSkillFilter(e.target.value)}
                            />
                            <Input 
                                label="Por Interés"
                                value={interestFilter}
                                onChange={(e) => setInterestFilter(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        <h4 className="font-semibold mb-4 text-slate-700">Perfiles Encontrados ({filteredCandidates.length})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map(candidate => (
                                    <div key={candidate.id} className="border border-slate-200 rounded-lg p-4 flex items-start gap-3 hover:shadow-md transition-shadow bg-white">
                                        <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-800">{candidate.name}</h5>
                                            <div className="flex flex-wrap gap-1 my-1">
                                                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">{candidate.skill}</span>
                                                <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">{candidate.interest}</span>
                                            </div>
                                            <p className="text-sm text-slate-600 line-clamp-2">{candidate.bio}</p>
                                            <button className="text-xs font-bold text-rose-500 mt-2 hover:underline uppercase tracking-wide">
                                                Ver Perfil CV &rarr;
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 col-span-2 text-center py-8">No se encontraron candidatos.</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-slate-200 text-right">
                        <Button variant="secondary" onClick={() => setShowInviteModal(false)}>Cerrar</Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Business;