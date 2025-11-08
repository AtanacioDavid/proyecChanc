
import React from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BusinessProject, CompanyChallenge } from '../types';

const businessProjects: BusinessProject[] = [
    {id: 1, title: 'AgriTech Córdoba', description: 'Sensores IoT low-cost para pequeños productores.', company: 'Innovate Agro'},
    {id: 2, title: 'AgriSense', description: 'Análisis de suelo inteligente con IA.', company: 'TechFields'},
    {id: 3, title: 'EcoMarket', description: 'Marketplace para productos sustentables.', company: 'Green Ventures'},
];

const companyChallenges: CompanyChallenge[] = [
    {id: 1, title: 'Packaging ecológico', description: 'Alternativas de embalaje sustentable para nuestros proveedores locales.', company: 'SuperVeaDel', deadline: '2025-11-12'},
    {id: 2, title: 'Reducir desperdicio de caucho', description: 'Buscar soluciones innovadoras para reutilizar el caucho sobrante.', company: 'Xinca SRLDel', deadline: '2025-10-30'},
];

const Business: React.FC = () => {
  return (
    <div className="space-y-8">
        <HeaderBanner 
            title="Chance Business"
            subtitle="Conecta ideas de jóvenes emprendedores con desafíos reales de empresas."
        />

        <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    <Button>+ Publicar proyecto de negocio</Button>
                    <Button variant="secondary">+ Publicar desafío (empresa)</Button>
                </div>
                <div className="relative w-full sm:w-auto">
                    <input 
                        type="text" 
                        placeholder="Buscar por palabra clave, industria..." 
                        className="w-full sm:w-64 pl-4 pr-10 py-2 border border-slate-300 rounded-full"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </Card>

        <div className="p-4 bg-teal-50 border-l-4 border-teal-500 text-teal-800 rounded-r-lg">
            <p><span className="font-bold">Participar en otros proyectos fortalece tu equipo:</span> Participar en proyectos te permite formar redes, validar habilidades y crear equipos sólidos. Eso facilita acceso a inversores, modelos fintech y espacios físicos de trabajo en el futuro.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Proyectos de negocio</h2>
                <div className="space-y-4">
                    {businessProjects.map(p => (
                        <Card key={p.id}>
                            <h3 className="font-bold text-lg text-teal-700">{p.title}</h3>
                            <p className="text-sm text-slate-500 mb-2">{p.company}</p>
                            <p className="text-slate-600">{p.description}</p>
                             <div className="mt-4 flex flex-wrap gap-2">
                                <Button size="sm" variant="secondary">Ver detalles</Button>
                                <Button size="sm" variant="secondary">Invitar equipo</Button>
                                <Button size="sm" variant="secondary">Copiar enlace</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Desafíos de empresas</h2>
                <div className="space-y-4">
                    {companyChallenges.map(c => (
                        <Card key={c.id}>
                            <h3 className="font-bold text-lg text-rose-600">{c.title}</h3>
                            <p className="text-sm text-slate-500 mb-2">{c.company} - Vence: {c.deadline}</p>
                            <p className="text-slate-600">{c.description}</p>
                             <div className="mt-4 flex flex-wrap gap-2">
                                <Button size="sm" variant="primary">Ver / Postular</Button>
                                <Button size="sm" variant="secondary">Copiar enlace</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
};

export default Business;
