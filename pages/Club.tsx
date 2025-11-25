
import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mentor, InvestmentFund, GovernanceProposal, ClubEvent } from '../types';

const benefits = [
    { key: 'espacios', icon: '🏢', title: 'Espacios de trabajo', description: 'Accede a oficinas y lugares para potenciar tus proyectos.' },
    { key: 'recursos', icon: '📡', title: 'Recursos', description: 'Wifi, herramientas y servicios compartidos.' },
    { key: 'mentorias', icon: '🎓', title: 'Mentorías', description: 'Aprende de expertos y comparte experiencias.' },
    { key: 'inversion', icon: '💰', title: 'Fondo de inversión', description: 'Oportunidades de financiamiento para tus ideas.' },
    { key: 'gobernabilidad', icon: '🤝', title: 'Cogobernabilidad', description: 'Participa en las decisiones y el futuro del club.' },
    { key: 'eventos', icon: '🎉', title: 'Eventos Exclusivos', description: 'Networking, talleres y charlas con líderes del sector.' },
] as const;

type ClubView = typeof benefits[number]['key'] | 'home';

const mentorsData: Mentor[] = [
    {id: 1, name: 'Elena Rodriguez', specialty: 'Marketing Digital', linkedin: 'https://linkedin.com/in/elenarodriguez'},
    {id: 2, name: 'Marcos Fernandez', specialty: 'Finanzas para Startups', linkedin: 'https://linkedin.com/in/marcosfernandez'},
    {id: 3, name: 'Lucia Torres', specialty: 'Desarrollo de Producto', linkedin: 'https://linkedin.com/in/luciatorres'},
];
const fundsData: InvestmentFund[] = [
    {id: 1, name: 'Impacto Latam', description: 'Fondo de capital semilla para proyectos con impacto social.', focus: 'Sostenibilidad, Educación'},
    {id: 2, name: 'Tech Innovators', description: 'Inversión en startups tecnológicas en etapa temprana.', focus: 'IA, SaaS, Fintech'},
];
const proposalsData: GovernanceProposal[] = [
    {id: 1, title: 'Nuevo sistema de reserva de salas', description: 'Implementar una app para gestionar los espacios de trabajo compartidos.', votesFor: 128, votesAgainst: 12},
    {id: 2, title: 'Programa de becas para nuevos miembros', description: 'Crear un fondo para subsidiar la membresía de estudiantes.', votesFor: 256, votesAgainst: 3},
];
const eventsData: ClubEvent[] = [
    {id: 1, title: 'Demo Day Q3', date: '2025-09-15', description: 'Presentación de los proyectos incubados en el último trimestre.', location: 'Auditorio Principal'},
    {id: 2, title: 'Workshop: Escalando tu Negocio', date: '2025-10-02', description: 'Taller práctico con expertos en crecimiento de startups.', location: 'Sala 3'},
];

const Club: React.FC = () => {
    const [view, setView] = useState<ClubView>('home');

    const renderContent = () => {
        const BackButton = () => (
            <Button variant="secondary" onClick={() => setView('home')} className="mb-6">
                &larr; Volver al Club
            </Button>
        );

        switch(view) {
            case 'home':
                return (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit) => (
                            <Card key={benefit.key} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => setView(benefit.key)}>
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold text-teal-700">{benefit.title}</h3>
                                <p className="mt-2 text-slate-600">{benefit.description}</p>
                            </Card>
                        ))}
                    </div>
                );
            case 'mentorias':
                return (
                    <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Mentorías 🎓</h2>
                        <div className="space-y-4">
                            {mentorsData.map(mentor => (
                                <Card key={mentor.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h4 className="font-bold text-lg">{mentor.name}</h4>
                                        <p className="text-slate-600">{mentor.specialty}</p>
                                    </div>
                                    <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                      <Button className="w-full sm:w-auto">Ver Perfil</Button>
                                    </a>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 'inversion':
                return (
                    <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Fondo de inversión 💰</h2>
                        <div className="space-y-4">
                            {fundsData.map(fund => (
                                <Card key={fund.id}>
                                    <h4 className="font-bold text-lg">{fund.name}</h4>
                                    <p className="text-slate-600 my-2">{fund.description}</p>
                                    <p className="text-sm"><span className="font-semibold">Foco:</span> {fund.focus}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
             case 'gobernabilidad':
                return (
                    <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Cogobernabilidad 🤝</h2>
                        <div className="space-y-4">
                            {proposalsData.map(proposal => (
                                <Card key={proposal.id}>
                                    <h4 className="font-bold text-lg">{proposal.title}</h4>
                                    <p className="text-slate-600 my-2">{proposal.description}</p>
                                    <div className="flex flex-wrap gap-4 items-center mt-4">
                                        <Button size="sm" className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-500">Votar a favor ({proposal.votesFor})</Button>
                                        <Button size="sm" className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500">Votar en contra ({proposal.votesAgainst})</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 'eventos':
                 return (
                    <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Eventos Exclusivos 🎉</h2>
                        <div className="space-y-4">
                            {eventsData.map(event => (
                                <Card key={event.id}>
                                    <h4 className="font-bold text-lg">{event.title}</h4>
                                    <p className="text-slate-600 my-1">{event.description}</p>
                                    <p className="text-sm font-semibold">{event.date} @ {event.location}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 'espacios':
            case 'recursos':
                return (
                     <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">{view === 'espacios' ? 'Espacios de trabajo 🏢' : 'Recursos 📡'}</h2>
                        <Card>
                            <p className="text-slate-600">Información sobre {view === 'espacios' ? 'los espacios de trabajo' : 'los recursos disponibles'} próximamente.</p>
                        </Card>
                    </div>
                );
            default:
                setView('home');
                return null;
        }
    };

    return (
        <div className="space-y-8 pb-8">
            <HeaderBanner 
                title="Ecosistema de Crecimiento"
                subtitle="Un ecosistema para crecer. Conecta, colabora y accede a beneficios exclusivos."
            />
            {renderContent()}

            <div className="mt-12 border-t border-slate-200 pt-8">
                <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-rose-400">Membresía Chance Club</h3>
                            <p className="text-slate-300 mt-2">Accede a todos los espacios, mentorías exclusivas y el fondo de inversión.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <span className="text-3xl font-bold text-white mb-2">$10 <span className="text-sm text-slate-400 font-normal">/mes</span></span>
                            <Button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg shadow-lg shadow-rose-500/30">
                                Asociarme Ahora
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Club;
