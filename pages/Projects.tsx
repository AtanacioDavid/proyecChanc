
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
  const [newProject, setNewProject] = useState({ name: '', description: '', location: '', objectives: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (!res.ok) {
          throw new Error('No se pudieron cargar los proyectos');
        }
        const data: Project[] = await res.json();
        // Mock data para visualización de incubación (ya que el backend no tiene estos campos aún)
        const mockedData = data.map((p, idx) => {
             if(idx === 1) return {...p, incubatedBy: 'TechLabs Inc.'};
             return p;
        });
        setProjects(mockedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const userStr = localStorage.getItem('userInfo');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }

    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        setFormError("Debes iniciar sesión para publicar un proyecto.");
        return;
    }
    setFormLoading(true);
    setFormError(null);
    try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify(newProject)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Error al publicar el proyecto');
        }
        setProjects(prev => [data, ...prev]);
        setNewProject({ name: '', description: '', location: '', objectives: '' });
    } catch (err: any) {
        setFormError(err.message);
    } finally {
        setFormLoading(false);
    }
  };
  
  const { myProjects, otherProjects } = useMemo(() => {
    const my = projects.filter(p => p.leader?._id === currentUser?._id);
    const other = projects.filter(p => p.leader?._id !== currentUser?._id);
    return { myProjects: my, otherProjects: other };
  }, [projects, currentUser]);


  const renderProjectList = (projectList: Project[], isMyProject: boolean) => {
    if (loading) return <p className="text-slate-500">Cargando proyectos...</p>;
    if (projectList.length === 0) {
        return <p className="text-slate-500">{isMyProject ? "Aún no has publicado ningún proyecto." : "No hay otros proyectos para mostrar."}</p>;
    }

    return projectList.map((project) => (
      <div key={project._id} className={`p-4 border rounded-lg bg-slate-50 relative ${project.incubatedBy ? 'border-purple-300 shadow-sm' : 'border-slate-200'}`}>
        {project.incubatedBy && (
             <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                 🚀 Incubado por {project.incubatedBy}
             </div>
        )}
        
        <h3 className="font-bold text-xl text-teal-700 mt-2">{project.name}</h3>
        <p className="text-slate-600 mt-1">{project.description}</p>
        <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-slate-500">Líder: {project.leader?.name || 'Desconocido'}</p>
        </div>
        
         <div className="mt-4 flex flex-wrap gap-2">
            {isMyProject ? (
                 <Button>
                    {project.isRecruiting ? 'Cerrar Reclutamiento' : 'Reclutar Equipo'}
                 </Button>
            ) : (
                project.isRecruiting ? (
                    <Button>Unirme al Proyecto</Button>
                ) : (
                    <span className="text-sm font-semibold text-slate-500 px-3 py-1 bg-slate-200 rounded-full">Reclutamiento cerrado</span>
                )
            )}
        </div>
      </div>
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
          <Textarea label="Problema a resolver" id="description" name="description" value={newProject.description} onChange={handleInputChange} placeholder="Describe el problema que aborda tu proyecto" required />
          <Input label="Ubicación" id="location" name="location" value={newProject.location} onChange={handleInputChange} placeholder="Ej: Buenos Aires, Argentina" required />
          <Input label="Objetivos" id="objectives" name="objectives" value={newProject.objectives} onChange={handleInputChange} placeholder="¿Qué quieres lograr?" required />
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          <div className="pt-2">
            <Button type="submit" disabled={formLoading}>{formLoading ? 'Publicando...' : 'Publicar Proyecto'}</Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Mis Proyectos</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
            {renderProjectList(myProjects, true)}
        </div>
      </Card>
       <Card>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Descubrir Otros Proyectos</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
            {renderProjectList(otherProjects, false)}
        </div>
      </Card>
    </div>
  );
};

export default Projects;