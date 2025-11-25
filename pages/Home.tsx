
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Page, Project } from '../types';

interface HomeProps {
    setActivePage: (page: Page) => void;
}

// Mock Data enriquecida para simular proyectos destacados orgánicamente
const MOCK_FEATURED_PROJECTS: Project[] = [
    { 
        _id: '1', 
        name: 'EcoTech', 
        description: 'Sistema de riego inteligente que ahorra un 40% de agua utilizando sensores de humedad low-cost.', 
        location: 'Buenos Aires', 
        objectives: 'Implementar en 50 hectáreas para fin de año.',
        leader: { _id: '99', name: 'Martina Stoessel', email: 'martina@mail.com' },
        status: 'En Escala',
        likes: 1250,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        neededRoles: ['Ingeniero Agrónomo'],
        updates: [
            { id: 1, date: '2025-01-20', title: 'Instalación Piloto', description: 'Primeros sensores instalados en campo real.', imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80' }
        ]
    },
    { 
        _id: '2', 
        name: 'ConnectApp', 
        description: 'Red social hiper-local para conectar oficios con vecinos. Validación de identidad biométrica.', 
        location: 'Córdoba', 
        objectives: 'Llegar a 10.000 usuarios activos.',
        leader: { _id: '98', name: 'Lucas Sugo', email: 'lucas@mail.com' },
        status: 'Validado',
        likes: 890,
        neededRoles: ['Dev React Native', 'UX Writer'],
        updates: [
            { id: 1, date: '2025-02-15', title: 'Lanzamiento Beta', description: 'Ya disponible en Play Store para testeo cerrado.', imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=80' }
        ]
    },
    { 
        _id: '3', 
        name: 'SaludDigital', 
        description: 'Plataforma de telemedicina accesible para zonas rurales con baja conectividad.', 
        location: 'Remoto', 
        objectives: 'Alianza con 5 municipios.',
        leader: { _id: '97', name: 'Dr. House', email: 'house@mail.com' },
        status: 'Prototipo',
        likes: 450,
        neededRoles: ['Médicos Asesores'],
        updates: []
    },
];

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Estado local para manejar los proyectos (y sus likes)
  const [projects, setProjects] = useState<Project[]>(MOCK_FEATURED_PROJECTS);

  // Modales
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const features = [
    { text: 'Tu talento crea oportunidades', emoji: '✨' },
    { text: 'Conecta con talento', emoji: '🤝' },
    { text: 'Haz crecer tus ideas', emoji: '🚀' },
    { text: 'Impacta en tu comunidad', emoji: '🌍' },
    { text: 'Valida tus habilidades', emoji: '🛡️' },
  ];

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    p.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  const openIntegration = (project: Project) => {
      setSelectedProject(project);
      setShowDetailModal(false); // Cerramos el detalle si estaba abierto
      setShowIntegrationModal(true);
  };

  const openDetail = (project: Project) => {
      setSelectedProject(project);
      setShowDetailModal(true);
  };

  const handleLike = (projectId: string) => {
      setProjects(prev => prev.map(p => {
          if (p._id === projectId) {
              return { ...p, likes: (p.likes || 0) + 1 };
          }
          return p;
      }));
      if (selectedProject && selectedProject._id === projectId) {
          setSelectedProject(prev => prev ? ({ ...prev, likes: (prev.likes || 0) + 1 }) : null);
      }
  };

  const sendProposal = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`¡Propuesta enviada a ${selectedProject?.name}!`);
      setShowIntegrationModal(false);
  };

  return (
    <div>
      <div className="space-y-12">
        <section className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Aquí comienza tu camino.</h1>
          <p className="mt-4 text-2xl md:text-3xl font-light text-rose-600">
            No esperes a que te den la oportunidad, <span className="font-semibold">créala.</span> ✨
          </p>
          
          {/* Buscador Principal */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow-lg border border-slate-100 max-w-3xl relative z-0">
              <p className="text-sm text-slate-500 mb-2 font-semibold">🔍 Encuentra proyectos o talento:</p>
              <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                        label="" 
                        placeholder="¿Qué te interesa? (ej. Agro, Tech)" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="md:w-1/3">
                    <Input 
                        label="" 
                        placeholder="Ubicación" 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <Button className="mt-1 md:mt-0 h-[42px] self-end" onClick={() => setActivePage('Proyectos')}>
                      Explorar
                  </Button>
              </div>
          </div>

          <div className="mt-8">
            <Button 
              size="lg"
              onClick={() => setActivePage('Proyectos')}
            >
              Comenzar mi proyecto
            </Button>
          </div>
        </section>

        <section>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-lg text-slate-700">
                <span className="text-2xl">{feature.emoji}</span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-800">🌟 Proyectos Destacados</h2>
            <p className="text-sm text-slate-500 hidden md:block">Posicionados por la comunidad ❤️</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="hover:shadow-xl transition-all duration-300 border-t-4 border-teal-500 flex flex-col justify-between h-full transform hover:-translate-y-1">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-teal-800">{project.name}</h3>
                        <div className={`text-xs font-bold px-2 py-1 rounded text-white
                            ${project.status === 'Validado' ? 'bg-green-500' : 
                              project.status === 'En Escala' ? 'bg-purple-600' : 
                              'bg-blue-500'}`}>
                            {project.status}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <span>📍 {project.location}</span>
                        <span>•</span>
                        <span className="font-bold text-rose-500 flex items-center gap-1">
                            ❤️ {project.likes}
                        </span>
                    </div>

                    <p className="text-slate-600 line-clamp-3 mb-4">{project.description}</p>

                    {/* Mini Galería Preview (Si hay updates) */}
                    {project.updates && project.updates.length > 0 && project.updates[0].imageUrl && (
                        <div className="mb-4 rounded-md overflow-hidden h-32 relative group cursor-pointer" onClick={() => openDetail(project)}>
                            <img src={project.updates[0].imageUrl} alt="Avance" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Ver Avance</span>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                    <Button variant="secondary" className="w-full text-slate-700 hover:bg-slate-100" onClick={() => openDetail(project)}>
                        👁️ Ver Información Completa
                    </Button>
                    <Button 
                        className="w-full bg-teal-700 text-white hover:bg-teal-800 shadow-sm border-none font-semibold"
                        onClick={() => openIntegration(project)}
                    >
                        💡 Proponer Integración
                    </Button>
                </div>
              </Card>
            ))}
            
            {filteredProjects.length === 0 && (
                <p className="text-slate-500 col-span-3 text-center py-10 bg-slate-50 rounded-lg">No se encontraron proyectos con esos criterios.</p>
            )}
          </div>
        </section>
      </div>

      {/* --- MODAL DE DETALLES (Reutilizado y adaptado) --- */}
      {showDetailModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 animate-fade-in overflow-y-auto">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8 relative overflow-hidden flex flex-col max-h-[90vh]">
                  
                  {/* Header Modal */}
                  <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50 sticky top-0 z-10">
                      <div>
                          <h3 className="text-3xl font-bold text-teal-800">{selectedProject.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                              <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded uppercase tracking-wide font-bold">{selectedProject.status}</span>
                              <button 
                                onClick={() => handleLike(selectedProject._id)}
                                className="flex items-center gap-1 text-rose-500 font-bold hover:scale-110 transition-transform bg-white border border-rose-200 px-3 py-1 rounded-full shadow-sm cursor-pointer"
                              >
                                  ❤️ {selectedProject.likes || 0} Me gusta
                              </button>
                          </div>
                      </div>
                      <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-700 text-3xl leading-none">&times;</button>
                  </div>

                  <div className="p-6 overflow-y-auto">
                      {/* Video Pitch */}
                      {selectedProject.videoUrl ? (
                          <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-black aspect-video flex items-center justify-center relative">
                               <div className="text-center text-white">
                                   <p className="text-6xl mb-2">▶️</p>
                                   <p className="font-bold text-lg">Pitch Video de Presentación</p>
                                   <a href={selectedProject.videoUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-100 hover:underline block mt-2">Ver en YouTube</a>
                               </div>
                          </div>
                      ) : (
                           <div className="mb-8 h-48 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center text-teal-800 font-bold text-xl">
                              Sin Video Pitch Disponible
                          </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Info Principal */}
                          <div className="md:col-span-2 space-y-8">
                              <div>
                                  <h4 className="font-bold text-slate-800 text-xl mb-3 border-l-4 border-rose-500 pl-3">Sobre el Proyecto</h4>
                                  <p className="text-slate-600 text-lg leading-relaxed">{selectedProject.description}</p>
                              </div>

                              <div>
                                  <h4 className="font-bold text-slate-800 text-xl mb-3 border-l-4 border-blue-500 pl-3">Objetivos</h4>
                                  <p className="text-slate-600">{selectedProject.objectives}</p>
                              </div>

                              {/* Bitácora */}
                              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                  <h4 className="font-bold text-slate-800 mb-6 text-xl">📅 Biblioteca de Avances</h4>
                                  {selectedProject.updates && selectedProject.updates.length > 0 ? (
                                      <div className="space-y-8 border-l-2 border-slate-300 pl-6 ml-2">
                                          {selectedProject.updates.map(update => (
                                              <div key={update.id} className="relative group">
                                                  <div className="absolute -left-[33px] top-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
                                                  <p className="text-xs font-bold text-slate-500 mb-1">{update.date}</p>
                                                  <h5 className="font-bold text-lg text-slate-800">{update.title}</h5>
                                                  <p className="text-slate-600 mb-3">{update.description}</p>
                                                  {update.imageUrl && (
                                                      <img src={update.imageUrl} alt="Evidencia" className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow" />
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p className="text-slate-500 italic">Aún no hay actualizaciones publicadas.</p>
                                  )}
                              </div>
                          </div>

                          {/* Sidebar */}
                          <div className="space-y-6">
                              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                                  <h5 className="font-bold text-slate-700 mb-4 border-b pb-2">Ficha Técnica</h5>
                                  <ul className="space-y-4 text-sm">
                                      <li className="flex flex-col"><span className="text-slate-500 text-xs uppercase font-bold">Líder del Equipo</span> <span className="font-medium text-lg">{selectedProject.leader?.name}</span></li>
                                      <li className="flex flex-col"><span className="text-slate-500 text-xs uppercase font-bold">Ubicación</span> <span className="font-medium">{selectedProject.location}</span></li>
                                  </ul>
                              </div>

                              {selectedProject.neededRoles && selectedProject.neededRoles.length > 0 && (
                                  <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl">
                                      <h5 className="font-bold text-rose-800 mb-3">🔍 Talento Buscado</h5>
                                      <div className="flex flex-wrap gap-2">
                                          {selectedProject.neededRoles.map((role, idx) => (
                                              <span key={idx} className="bg-white text-rose-600 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{role}</span>
                                          ))}
                                      </div>
                                  </div>
                              )}

                              <Button className="w-full py-4 text-lg shadow-lg bg-teal-700 hover:bg-teal-800 border-none" onClick={() => openIntegration(selectedProject)}>
                                  💡 Proponer Integración
                              </Button>
                          </div>
                      </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t text-right sticky bottom-0">
                      <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Cerrar</Button>
                  </div>
              </div>
          </div>
      )}

      {/* Modal de Propuesta Rápida */}
      {showIntegrationModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                  <button onClick={() => setShowIntegrationModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                  <h3 className="text-xl font-bold mb-2 text-teal-800">Integrarse a {selectedProject.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm">Cuéntales brevemente cómo tu talento o idea puede potenciar este proyecto.</p>
                  <form onSubmit={sendProposal} className="space-y-4">
                      <textarea className="w-full border rounded p-3 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Hola, soy experto en Marketing y me gustaría..." rows={4} required></textarea>
                      <div className="flex justify-end gap-2">
                          <Button type="submit" className="w-full bg-teal-600">Enviar Propuesta</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Home;
