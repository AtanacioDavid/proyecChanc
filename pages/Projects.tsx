import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Project } from '../types';

const otherProjectsData: Project[] = [
    { id: 101, name: 'Conexión Local', description: 'App para conectar vecinos y fomentar el comercio local.', location: 'Online', objectives: 'Fortalecer la comunidad barrial.', leader: 'Ana Gómez', isRecruiting: true },
    { id: 102, name: 'Música para Todos', description: 'Plataforma para que músicos independientes compartan su trabajo.', location: 'Global', objectives: 'Dar visibilidad a nuevos talentos musicales.', leader: 'Carlos Ruiz', isRecruiting: true },
    { id: 103, name: 'Huertos Urbanos IA', description: 'Sistema de IA para optimizar el cultivo en pequeños espacios.', location: 'Mendoza, AR', objectives: 'Promover la soberanía alimentaria en ciudades.', leader: 'Sofía Castro', isRecruiting: false },
];

const Projects: React.FC = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([
    { id: 1, name: 'EcoTech', description: 'Plataforma para el reciclaje comunitario.', location: 'Ciudad Capital', objectives: 'Fomentar el reciclaje y la economía circular.', leader: 'Juan Pérez', isRecruiting: false },
    { id: 2, name: 'ArteUrbano', description: 'Mapeo de murales y arte callejero.', location: 'Online', objectives: 'Visibilizar el arte urbano local.', leader: 'Juan Pérez', isRecruiting: true },
  ]);
  const [otherProjects, setOtherProjects] = useState<Project[]>(otherProjectsData);
  const [newProject, setNewProject] = useState({ name: '', problem: '', location: '', objectives: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name && newProject.problem && newProject.location && newProject.objectives) {
        const projectToAdd: Project = {
            id: myProjects.length + 3,
            name: newProject.name,
            description: newProject.problem,
            location: newProject.location,
            objectives: newProject.objectives,
            leader: 'Juan Pérez', // Current user assigned as leader
            isRecruiting: false,
        };
        setMyProjects(prev => [projectToAdd, ...prev]);
        setNewProject({ name: '', problem: '', location: '', objectives: '' });
    }
  };

  const toggleRecruiting = (projectId: number) => {
    setMyProjects(myProjects.map(p =>
      p.id === projectId ? { ...p, isRecruiting: !p.isRecruiting } : p
    ));
  };

  return (
    <div className="space-y-8">
      <HeaderBanner 
        title="Proyectos"
        subtitle="Crea tu proyecto, compártelo o recluta perfiles que te ayuden a hacerlo crecer."
      />

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Nuevo Proyecto</h2>
        <form className="space-y-4" onSubmit={handlePublish}>
          <Input label="Nombre del proyecto" id="name" name="name" value={newProject.name} onChange={handleInputChange} placeholder="Ej: EcoTech" required />
          <Input label="Problema a resolver" id="problem" name="problem" value={newProject.problem} onChange={handleInputChange} placeholder="Describe el problema que aborda tu proyecto" required />
          <Input label="Ubicación" id="location" name="location" value={newProject.location} onChange={handleInputChange} placeholder="Ej: Buenos Aires, Argentina" required />
          <Input label="Objetivos" id="objectives" name="objectives" value={newProject.objectives} onChange={handleInputChange} placeholder="¿Qué quieres lograr?" required />
          <div className="pt-2">
            <Button type="submit">Publicar Proyecto</Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Mis Proyectos</h2>
        <div className="space-y-6">
          {myProjects.length > 0 ? (
            myProjects.map((project) => (
              <div key={project.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <h3 className="font-bold text-xl text-teal-700">{project.name}</h3>
                <p className="text-slate-600 mt-1">{project.description}</p>
                <p className="text-sm text-slate-500 mt-2">Líder: {project.leader}</p>
                 <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={() => toggleRecruiting(project.id)}>
                        {project.isRecruiting ? 'Cerrar Reclutamiento' : 'Reclutar Equipo'}
                    </Button>
                    {project.isRecruiting && <Button variant="secondary">Ver Perfiles</Button>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500">Aún no has publicado ningún proyecto.</p>
          )}
        </div>
      </Card>
       <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Descubrir Otros Proyectos</h2>
        <div className="space-y-6">
          {otherProjects.map((project) => (
              <div key={project.id} className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-bold text-xl text-teal-700">{project.name}</h3>
                <p className="text-slate-600 mt-1">{project.description}</p>
                <p className="text-sm text-slate-500 mt-2">Líder: {project.leader}</p>
                <div className="mt-4">
                    {project.isRecruiting ? (
                        <Button>Unirme al Proyecto</Button>
                    ) : (
                        <span className="text-sm font-semibold text-slate-500 px-3 py-1 bg-slate-200 rounded-full">Reclutamiento cerrado</span>
                    )}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Projects;