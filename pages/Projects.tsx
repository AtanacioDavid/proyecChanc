import React, { useState, useEffect, useMemo } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Project, User } from '../types';
import Textarea from '../components/ui/Textarea';
import { API_BASE_URL } from '../config';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newProject, setNewProject] = useState({ 
      name: '', 
      description: '', 
      location: '', 
      objectives: '',
      neededRolesString: '', 
      budget: '',
      videoUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --- MODALES ---
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [viewProposalsModalOpen, setViewProposalsModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false); // Nuevo Modal de Detalles
  
  // --- SELECCIONES ---
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // --- FORMS ---
  const [integrationForm, setIntegrationForm] = useState({ title: '', description: '', valueAdd: '' });
  const [integrationLoading, setIntegrationLoading] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('userInfo');
    let user: User | null = null;
    if (userStr) {
      user = JSON.parse(userStr);
      setCurrentUser(user);
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (!res.ok) {
          throw new Error('No se pudieron cargar los proyectos');
        }
        const data: Project[] = await res.json();
        
        // --- MOCK DATA: Simulamos datos reales para la DEMO ---
        const mockedData = data.map((p, idx) => {
             // 1. Simulamos el Proyecto "EduGame" (Caso de éxito del usuario)
             if(user && p.leader?._id === user._id && idx === 0) {
                 return {
                     ...p,
                     name: "EduGame: Matemáticas Divertidas",
                     description: "Plataforma gamificada validada en 3 escuelas rurales. Buscamos escalar a nivel nacional.",
                     status: "Validado",
                     likes: 342,
                     isRecruiting: false,
                     neededRoles: [],
                     budget: "Buscando Inversión Serie A",
                     videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Simulado
                     updates: [
                         { id: 1, date: '2025-02-10', title: '¡Prueba piloto exitosa!', description: 'Logramos que 50 niños aprendieran fracciones en 1 semana.', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80' },
                         { id: 2, date: '2025-01-15', title: 'Equipo completo', description: 'Damos la bienvenida a Sofía como Lead Designer.' }
                     ]
                 } as Project;
             }

             // 2. Otros proyectos simulados
             if(idx === 0) return {...p, isFeatured: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', likes: 89, status: 'Prototipo', updates: [{id:1, date:'2025-03-01', title:'MVP Listo', description:'Primera versión funcional lanzada.'}]} as Project; 
             if(idx === 1) return {...p, incubatedBy: 'TechLabs Inc.', likes: 156, status: 'En Escala'} as Project;
             return {...p, likes: Math.floor(Math.random() * 50), status: 'Idea'} as Project;
        });
        setProjects(mockedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIntegrationForm(prev => ({ ...prev, [name]: value }));
  };
  
  // --- LOGICA DE LIKES (Simulada en Frontend) ---
  const handleLike = (projectId: string) => {
      setProjects(prev => prev.map(p => {
          if (p._id === projectId) {
              return { ...p, likes: (p.likes || 0) + 1 };
          }
          return p;
      }));
      // Si el proyecto está abierto en el modal, actualizamos también el seleccionado
      if (selectedProject && selectedProject._id === projectId) {
          setSelectedProject(prev => prev ? ({ ...prev, likes: (prev.likes || 0) + 1 }) : null);
      }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        setFormError("Debes iniciar sesión para publicar un proyecto.");
        return;
    }
    setFormLoading(true);
    setFormError(null);

    const rolesArray = newProject.neededRolesString
        ? newProject.neededRolesString.split(',').map(role => role.trim()).filter(role => role !== '')
        : [];

    const projectPayload = {
        name: newProject.name,
        description: newProject.description,
        location: newProject.location,
        objectives: newProject.objectives,
        neededRoles: rolesArray,
        budget: newProject.budget,
        videoUrl: newProject.videoUrl,
        isRecruiting: rolesArray.length > 0
    };

    try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify(projectPayload)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Error al publicar el proyecto');
        }
        setProjects(prev => [data, ...prev]);
        setNewProject({ name: '', description: '', location: '', objectives: '', neededRolesString: '', budget: '', videoUrl: '' });
    } catch (err: any) {
        setFormError(err.message);
    } finally {
        setFormLoading(false);
    }
  };

  // --- HANDLERS MODALES ---
  const openDetailModal = (project: Project) => {
      setSelectedProject(project);
      setDetailModalOpen(true);
  };

  const openIntegrationModal = (project: Project) => {
      if(!currentUser) {
          alert("Debes iniciar sesión para proponer una integración.");
          return;
      }
      setSelectedProject(project);
      setDetailModalOpen(false); // Cerramos el de detalle si estaba abierto
      setIntegrationModalOpen(true);
  };

  const submitIntegration = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!selectedProject || !currentUser) return;
      
      setIntegrationLoading(true);
      try {
          const res = await fetch(`${API_BASE_URL}/api/projects/${selectedProject._id}/integrate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify(integrationForm)
          });

          if(!res.ok) throw new Error("Error al enviar propuesta");
          
          alert(`¡Propuesta enviada a ${selectedProject.name}! El líder del proyecto recibirá tu idea.`);
          setIntegrationModalOpen(false);
          setIntegrationForm({ title: '', description: '', valueAdd: '' });

      } catch (error) {
          alert("Hubo un error al enviar la propuesta.");
      } finally {
          setIntegrationLoading(false);
      }
  };
  
  const handleApplyToBusiness = (project: Project) => {
      const confirmApply = window.confirm(`¿Deseas postular a "${project.name}" para el programa de Incubación/Inversión en Chance Business?`);
      if (confirmApply) {
          alert("¡Postulación enviada con éxito! Tu proyecto ahora aparece en el radar de Empresas Aliadas.");
          // Aquí se haría una llamada al backend para cambiar el estado del proyecto a "Buscando Inversión"
      }
  };
  
  const { myProjects, otherProjects } = useMemo(() => {
    const my = projects.filter(p => p.leader?._id === currentUser?._id);
    const other = projects.filter(p => p.leader?._id !== currentUser?._id);
    return { myProjects: my, otherProjects: other };
  }, [projects, currentUser]);


  const renderProjectCard = (project: Project, isMyProject: boolean) => (
      <div key={project._id} 
           className={`p-6 border rounded-lg bg-white relative transition-all duration-300 flex flex-col justify-between h-full
           ${project.isFeatured ? 'border-amber-400 shadow-lg transform scale-[1.01]' : 'border-slate-200 shadow-sm hover:shadow-md'}
           ${project.incubatedBy ? 'border-purple-300' : ''}`}
      >
        {/* Etiquetas Flotantes */}
        <div className="absolute -top-3 right-4 flex gap-2 z-10">
            {project.status && (
                <div className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1
                    ${project.status === 'Validado' ? 'bg-green-500' : 
                      project.status === 'En Escala' ? 'bg-purple-600' : 
                      project.status === 'Prototipo' ? 'bg-blue-500' : 'bg-slate-400'}`}>
                    {project.status === 'Validado' ? '✅ Validado' : project.status}
                </div>
            )}
            {project.isFeatured && (
                <div className="bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    ⭐ Destacado
                </div>
            )}
        </div>

        <div className="mt-4">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-800">{project.name}</h3>
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>📍 {project.location}</span>
                {project.likes !== undefined && (
                     <button onClick={() => handleLike(project._id)} className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                         ❤️ {project.likes}
                     </button>
                )}
             </div>
             <p className="text-slate-600 line-clamp-3 mb-4 text-sm">{project.description}</p>
             
             {project.incubatedBy && (
                 <div className="bg-purple-50 p-2 rounded border border-purple-100 mb-3">
                     <p className="text-xs text-purple-800 font-semibold">🚀 Incubado por: {project.incubatedBy}</p>
                 </div>
             )}
             
             {project.neededRoles && project.neededRoles.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                    {project.neededRoles.slice(0, 3).map((role, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">{role}</span>
                    ))}
                    {project.neededRoles.length > 3 && <span className="text-xs text-slate-400 px-2 py-1">+{project.neededRoles.length - 3}</span>}
                </div>
             )}
        </div>

        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
            <Button variant="secondary" className="flex-1 text-sm" onClick={() => openDetailModal(project)}>Ver +</Button>
            {!isMyProject && (
                 <Button className="flex-1 text-sm bg-teal-600 hover:bg-teal-700" onClick={() => openIntegrationModal(project)}>Integrarse</Button>
            )}
            {isMyProject && project.status === 'Validado' && (
                 <Button className="flex-1 text-sm bg-purple-600 hover:bg-purple-700" onClick={() => handleApplyToBusiness(project)}>Escalar</Button>
            )}
        </div>
      </div>
  );

  return (
    <div className="space-y-8">
      <HeaderBanner 
        title="Proyectos Comunitarios" 
        subtitle="Sube tu idea, forma tu equipo y valida tu talento. Si buscas unirte a algo grande, este es el lugar."
      />

      {/* Formulario de Nuevo Proyecto */}
      <Card className="border-l-4 border-rose-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🚀 Inicia tu Proyecto</h2>
        <form onSubmit={handlePublish} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nombre del Proyecto" name="name" value={newProject.name} onChange={handleInputChange} required placeholder="Ej. EcoTech" />
                <Input label="Ubicación" name="location" value={newProject.location} onChange={handleInputChange} required placeholder="Ej. Buenos Aires" />
            </div>
            <Input label="Descripción Corta" name="description" value={newProject.description} onChange={handleInputChange} required placeholder="¿De qué trata?" />
            <Textarea label="Objetivos / Visión" name="objectives" value={newProject.objectives} onChange={handleInputChange} required placeholder="¿Qué quieren lograr?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Input label="Roles Buscados (separados por coma)" name="neededRolesString" value={newProject.neededRolesString} onChange={handleInputChange} placeholder="Ej. Diseñador, Dev Backend" />
                 <Input label="Video Pitch URL (Opcional)" name="videoUrl" value={newProject.videoUrl} onChange={handleInputChange} placeholder="Youtube Link" />
            </div>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            <div className="text-right">
                <Button type="submit" disabled={formLoading}>{formLoading ? 'Publicando...' : 'Publicar Proyecto'}</Button>
            </div>
        </form>
      </Card>

      {/* Listas de Proyectos */}
      <div className="space-y-8">
          {currentUser && myProjects.length > 0 && (
              <section>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Mis Proyectos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myProjects.map(p => renderProjectCard(p, true))}
                  </div>
              </section>
          )}
          
          <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Explorar Proyectos</h2>
              {loading ? (
                  <p>Cargando proyectos...</p>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherProjects.map(p => renderProjectCard(p, false))}
                  </div>
              )}
          </section>
      </div>

      {/* MODAL INTEGRACION */}
      {integrationModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
             <div className="bg-white rounded-lg p-6 w-full max-w-md">
                 <h3 className="text-xl font-bold mb-4">Integrarse a {selectedProject.name}</h3>
                 <form onSubmit={submitIntegration} className="space-y-4">
                     <Input label="Título de tu propuesta" name="title" value={integrationForm.title} onChange={handleIntegrationChange} required />
                     <Textarea label="¿Cómo puedes aportar?" name="description" value={integrationForm.description} onChange={handleIntegrationChange} required />
                     <Input label="Valor Agregado (Skill principal)" name="valueAdd" value={integrationForm.valueAdd} onChange={handleIntegrationChange} required />
                     <div className="flex justify-end gap-2 mt-4">
                         <Button type="button" variant="secondary" onClick={() => setIntegrationModalOpen(false)}>Cancelar</Button>
                         <Button type="submit" disabled={integrationLoading}>{integrationLoading ? 'Enviando...' : 'Enviar Propuesta'}</Button>
                     </div>
                 </form>
             </div>
        </div>
      )}

      {/* MODAL DETALLES */}
      {detailModalOpen && selectedProject && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
               <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                        <button onClick={() => setDetailModalOpen(false)} className="text-slate-500">&times;</button>
                    </div>
                    {selectedProject.videoUrl && (
                        <div className="mb-4 aspect-video bg-black rounded flex items-center justify-center text-white">
                            <a href={selectedProject.videoUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-100 hover:underline">Ver Video Pitch</a>
                        </div>
                    )}
                    <p className="text-slate-600 mb-4">{selectedProject.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <h4 className="font-bold">Objetivos</h4>
                            <p className="text-sm">{selectedProject.objectives}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Ubicación</h4>
                            <p className="text-sm">{selectedProject.location}</p>
                        </div>
                    </div>
                    
                    {selectedProject.updates && selectedProject.updates.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                            <h4 className="font-bold mb-2">Bitácora de Avances</h4>
                            {selectedProject.updates.map(u => (
                                <div key={u.id} className="mb-3 pl-3 border-l-2 border-slate-300">
                                    <p className="text-xs text-slate-500">{u.date}</p>
                                    <p className="font-semibold text-sm">{u.title}</p>
                                    <p className="text-sm text-slate-600">{u.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button variant="secondary" onClick={() => setDetailModalOpen(false)}>Cerrar</Button>
                    </div>
               </div>
           </div>
      )}
    </div>
  );
};

export default Projects;