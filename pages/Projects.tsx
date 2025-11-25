
import React, { useState, useEffect, useMemo } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Project, User, TeamMember } from '../types';
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
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
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
        // Intentamos conectar al backend
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        
        let data: Project[] = [];
        
        if (res.ok) {
            data = await res.json();
        } else {
            console.warn("Backend no respondió correctamente, usando datos de demostración.");
        }

        // --- INYECCIÓN DE PROYECTO DEMO "FINALIZADO" ---
        // Insertamos manualmente este proyecto para que SIEMPRE aparezca en Explorar,
        // permitiéndote probar la validación de equipo y soft skills.
        const recyclingProject: Project = {
            _id: "finalized-demo-001",
            name: "Reciclaje IA: Clasificación Automática",
            description: "Sistema finalizado de visión por computadora para separar plásticos. Entregado a cooperativa local.",
            location: "Rosario",
            objectives: "Optimizar el reciclaje urbano mediante IA.",
            leader: { _id: "other_leader_id", name: "Julián Tech", email: "julian@tech.com" },
            status: "Finalizado",
            likes: 850,
            videoUrl: "",
            updates: [
                 { id: 3, date: '2025-04-20', title: 'Entrega Final', description: 'El software ya está operando en la planta de reciclaje.', imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80' }
            ],
            teamMembers: [
                { id: 'tm_demo_1', name: 'Julián Tech', role: 'Líder Técnico', avatar: 'https://randomuser.me/api/portraits/men/85.jpg' },
                { id: 'tm_demo_2', name: 'Clara Gestión', role: 'Project Manager', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
                { id: 'tm_demo_3', name: 'Lucas Frontend', role: 'Desarrollador Web', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
            ]
        };

        // Combinamos lo que traiga el backend (si trae algo) con nuestro proyecto demo
        // Filtramos para no duplicarlo si ya existiera por alguna razón
        const combinedData = [...data.filter(p => p._id !== recyclingProject._id), recyclingProject];


        // Si hay conexión, enriquecemos los datos reales con lógica visual
        const enrichedData = combinedData.map((p) => {
             // Lógica de enriquecimiento visual
             // Fix comparison error by casting leader to any
             const leaderId = p.leader ? (typeof (p.leader as any) === 'object' ? (p.leader as any)._id : p.leader) : null;
             
             if(user && leaderId === user._id) {
                 return {
                     ...p,
                     status: p.status || "Idea",
                     likes: p.likes || 0,
                     // Aseguramos que mis proyectos tengan al menos al usuario como miembro
                     teamMembers: p.teamMembers || [
                         { id: user._id, name: user.name, role: 'Líder', avatar: `https://ui-avatars.com/api/?name=${user.name}` }
                     ]
                 } as Project;
             }
             return p;
        });
        setProjects(enrichedData);

      } catch (err: any) {
        console.log("Error fetching projects, loading fallback demo data", err);
        // Fallback completo si falla la red
        const demoProjects: Project[] = [
             {
                _id: "demo-edugame",
                name: "EduGame: Matemáticas Divertidas",
                description: "Plataforma gamificada validada en 3 escuelas rurales.",
                location: "Córdoba",
                objectives: "Escalar a 100 escuelas.",
                leader: user ? { _id: user._id, name: user.name, email: user.email } : { _id: "u1", name: "Usuario Demo", email: "demo@mail.com" },
                status: "Validado",
                likes: 342,
                teamMembers: [
                    { id: 'tm1', name: 'Sofía Ruiz', role: 'Diseñadora UX/UI', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                    { id: user?._id || 'u1', name: user?.name || 'Tú', role: 'Líder', avatar: `https://ui-avatars.com/api/?name=${user?.name || 'User'}` }
                ]
            }
        ];
        setProjects(demoProjects);
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
        
        if (!res.ok) {
             // Si falla (backend off), simulamos éxito visual
             const mockCreated: Project = {
                 ...projectPayload,
                 _id: `temp-${Date.now()}`,
                 leader: currentUser,
                 createdAt: new Date().toISOString(),
                 status: 'Idea',
                 likes: 0
             } as Project;
             setProjects(prev => [mockCreated, ...prev]);
             alert("Proyecto publicado (Modo Demo: No se guardó en base de datos porque el backend está offline).");
        } else {
            const data = await res.json();
            // Aseguramos que el proyecto creado tenga al usuario como miembro del equipo visualmente
            const newProjectWithMember = {
                ...data,
                teamMembers: [{ id: currentUser._id, name: currentUser.name, role: 'Líder', avatar: currentUser.photoUrl }]
            };
            setProjects(prev => [newProjectWithMember, ...prev]);
        }
        
        setNewProject({ name: '', description: '', location: '', objectives: '', neededRolesString: '', budget: '', videoUrl: '' });
    } catch (err: any) {
        // Fallback visual
         const mockCreated: Project = {
             ...projectPayload,
             _id: `temp-${Date.now()}`,
             leader: currentUser,
             createdAt: new Date().toISOString(),
             status: 'Idea',
             likes: 0
         } as Project;
         setProjects(prev => [mockCreated, ...prev]);
         alert("Proyecto publicado (Modo Demo: No se guardó en base de datos).");
    } finally {
        setFormLoading(false);
    }
  };

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
      setDetailModalOpen(false);
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
          alert("Propuesta enviada (Modo Demo).");
          setIntegrationModalOpen(false);
      } finally {
          setIntegrationLoading(false);
      }
  };
  
  const handleApplyToBusiness = (project: Project) => {
      const confirmApply = window.confirm(`¿Deseas postular a "${project.name}" para el programa de Incubación/Inversión en Chance Business?`);
      if (confirmApply) {
          alert("¡Postulación enviada con éxito! Tu proyecto ahora aparece en el radar de Empresas Aliadas.");
      }
  };

  const handleValidateSkill = (member: TeamMember) => {
      if (member.id === currentUser?._id) {
          alert("¡No puedes validarte a ti mismo, pídele a un compañero!");
          return;
      }

      // Opciones de Soft Skills
      const softSkills = ["Liderazgo 🦁", "Comunicación 🗣️", "Resiliencia 🛡️", "Trabajo en Equipo 🤝", "Creatividad 💡", "Gestión de Tiempo ⏳"];
      
      const skillInput = window.prompt(
          `¿Qué habilidad blanda quieres destacar en ${member.name}?\n\nOpciones sugeridas (escribe una): ${softSkills.join(', ')}`
      );
      
      if (skillInput) {
          // Simulamos el envío
          alert(`¡Genial! Has validado la habilidad "${skillInput}" de ${member.name}. \n\nEsta insignia aparecerá ahora en su CV Digital y aumentará la credibilidad del equipo.`);
      }
  }
  
  const { myProjects, otherProjects } = useMemo(() => {
    if (!currentUser) return { myProjects: [], otherProjects: projects };
    
    // Filtro robusto para manejar tanto IDs de Mongo como objetos Leader populados
    const my = projects.filter(p => {
        if (!p.leader) return false;
        // Casteo seguro para evitar errores de tipo en la comparación
        const leaderAny = p.leader as any;
        const leaderId = typeof leaderAny === 'object' ? leaderAny._id : leaderAny;
        return leaderId === currentUser._id;
    });
    
    const other = projects.filter(p => {
        if (!p.leader) return true; // Si no tiene líder, lo mostramos en otros
        const leaderAny = p.leader as any;
        const leaderId = typeof leaderAny === 'object' ? leaderAny._id : leaderAny;
        return leaderId !== currentUser._id;
    });

    return { myProjects: my, otherProjects: other };
  }, [projects, currentUser]);


  const renderProjectCard = (project: Project, isMyProject: boolean) => (
      <div key={project._id} 
           className={`p-6 border rounded-lg bg-white relative transition-all duration-300 flex flex-col justify-between h-full
           ${project.isFeatured ? 'border-amber-400 shadow-lg transform scale-[1.01]' : 'border-slate-200 shadow-sm hover:shadow-md'}
           ${project.incubatedBy ? 'border-purple-300' : ''}
           ${project.status === 'Finalizado' ? 'border-l-4 border-l-green-500 bg-slate-50' : ''}`}
      >
        <div className="absolute -top-3 right-4 flex gap-2 z-10">
            {project.status && (
                <div className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1
                    ${project.status === 'Validado' ? 'bg-green-500' : 
                      project.status === 'En Escala' ? 'bg-purple-600' : 
                      project.status === 'Finalizado' ? 'bg-slate-700' :
                      project.status === 'Prototipo' ? 'bg-blue-500' : 'bg-slate-400'}`}>
                    {project.status === 'Validado' ? '✅ Validado' : project.status === 'Finalizado' ? '🏆 Finalizado' : project.status}
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
            {/* Si es mi proyecto, el botón cambia a 'Ver Equipo y Validar' */}
            <Button variant="secondary" className={`flex-1 text-sm ${isMyProject ? 'border border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100' : ''}`} onClick={() => openDetailModal(project)}>
                {isMyProject ? '👥 Ver Equipo y Validar' : (project.status === 'Finalizado' ? 'Ver Resultados' : 'Ver +')}
            </Button>
            
            {/* Ocultamos 'Integrarse' si el proyecto ya finalizó */}
            {!isMyProject && project.status !== 'Finalizado' && (
                 <Button className="flex-1 text-sm bg-teal-600 hover:bg-teal-700" onClick={() => openIntegrationModal(project)}>Integrarse</Button>
            )}
            
            {/* Botón de Escalar solo si está Validado y es Mío */}
            {isMyProject && project.status === 'Validado' && (
                 <Button className="flex-1 text-sm bg-purple-600 hover:bg-purple-700" onClick={() => handleApplyToBusiness(project)}>Escalar</Button>
            )}
        </div>
      </div>
  );

  return (
    <div className="space-y-8">
      <HeaderBanner 
        title="Haz realidad tus ideas" 
        subtitle="Sube tu idea, forma tu equipo y valida tu talento. Si buscas unirte a algo grande, este es el lugar."
      />

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

      {detailModalOpen && selectedProject && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
               <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                        <button onClick={() => setDetailModalOpen(false)} className="text-slate-500 hover:text-red-500 text-2xl">&times;</button>
                    </div>
                    {selectedProject.videoUrl && (
                        <div className="mb-4 aspect-video bg-black rounded flex items-center justify-center text-white">
                            <a href={selectedProject.videoUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-100 hover:underline">Ver Video Pitch</a>
                        </div>
                    )}
                    
                    {/* MENSAJE DE BENEFICIO PARA EL LÍDER O MIEMBRO */}
                    {(selectedProject.leader && currentUser && (
                        (typeof selectedProject.leader === 'object' && (selectedProject.leader as any)._id === currentUser._id) ||
                        ((selectedProject.leader as any) === currentUser._id)
                    )) && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r">
                            <h4 className="font-bold text-amber-800 text-lg flex items-center gap-2">
                                🚀 Potencia las oportunidades de tu equipo
                            </h4>
                            <p className="text-amber-700 text-sm mt-1">
                                Validar las habilidades blandas y dejar recomendaciones a tus compañeros aumenta la reputación del proyecto, mejora el CV de todos y multiplica las chances de conseguir inversión o empleo. ¡El karma profesional existe!
                            </p>
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
                    
                    {selectedProject.teamMembers && selectedProject.teamMembers.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-800">
                                    {selectedProject.status === 'Finalizado' ? 'Equipo y Recomendaciones' : 'Gestión de Equipo y Feedback'}
                                </h4>
                                {selectedProject.status === 'Finalizado' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Proyecto Terminado</span>}
                            </div>
                            <div className="space-y-3">
                                {selectedProject.teamMembers.map(member => (
                                    <div key={member.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <img src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`} alt={member.name} className="w-10 h-10 rounded-full border border-white shadow-sm" />
                                            <div>
                                                <p className="font-semibold text-sm">{member.name}</p>
                                                <p className="text-xs text-slate-500">{member.role}</p>
                                            </div>
                                        </div>
                                        {/* Botón de validación de Soft Skills */}
                                        {/* Mostramos el botón si NO soy yo (currentUser) O si currentUser es null (guest mode) */}
                                        {(member.id !== currentUser?._id) && (
                                            <Button size="sm" variant="secondary" className="text-xs border border-amber-200 text-amber-700 hover:bg-amber-50" onClick={() => handleValidateSkill(member)}>
                                                🏅 Validar y Recomendar
                                            </Button>
                                        )}
                                        {member.id === currentUser?._id && (
                                            <span className="text-xs text-slate-400 italic">Tú</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {selectedProject.updates && selectedProject.updates.length > 0 && (
                        <div className="mt-6 border-t pt-4">
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
