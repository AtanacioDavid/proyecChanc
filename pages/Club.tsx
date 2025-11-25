
import React, { useState } from 'react';
import HeaderBanner from '../components/HeaderBanner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mentor, InvestmentFund, GovernanceProposal, ClubEvent } from '../types';

const benefits = [
    { key: 'espacios', icon: '🏢', title: 'Espacios de trabajo', description: 'Red de oficinas y coworkings aliados para trabajar.' },
    { key: 'recursos', icon: '🎁', title: 'Beneficios y Asociados', description: 'Licencias gratuitas y descuentos de nuestros partners.' },
    { key: 'mentorias', icon: '🎓', title: 'Mentorías', description: 'Aprende de expertos y comparte experiencias.' },
    { key: 'inversion', icon: '💰', title: 'Fondo de inversión', description: 'Oportunidades de financiamiento para tus ideas.' },
    { key: 'gobernabilidad', icon: '🤝', title: 'Cogobernabilidad', description: 'Participa en las decisiones y el futuro del club.' },
    { key: 'eventos', icon: '🎉', title: 'Eventos Exclusivos', description: 'Networking, talleres y charlas con líderes del sector.' },
] as const;

type ClubView = typeof benefits[number]['key'] | 'home';

// DATOS MOCK
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

// NUEVOS DATOS PARA ESPACIOS Y ASOCIADOS
const spacesData = [
    { id: 1, name: 'Hub Central - Buenos Aires', location: 'Palermo, CABA', amenities: ['Wifi Alta Velocidad', 'Salas de Reunión', 'Café Ilimitado'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80', capacity: 'Disponible' },
    { id: 2, name: 'Chance Lab - Córdoba', location: 'Nueva Córdoba', amenities: ['Impresoras 3D', 'Estudio de Grabación', 'Espacio Maker'], image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80', capacity: 'Últimos lugares' },
    { id: 3, name: 'Coworking Alianza - Rosario', location: 'Centro', amenities: ['Auditorio', 'Mentores in-house', 'Terraza'], image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80', capacity: 'Disponible' },
];

const partnersData = [
    { id: 1, name: 'AWS Activate', offer: '$1,000 en créditos AWS', logo: '☁️', description: 'Infraestructura en la nube para escalar tu startup.' },
    { id: 2, name: 'Notion', offer: '6 meses Plan Plus gratis', logo: '📝', description: 'Organiza tu equipo y proyectos en un solo lugar.' },
    { id: 3, name: 'HubSpot', offer: '90% off primer año', logo: '📈', description: 'CRM y herramientas de marketing para crecer.' },
    { id: 4, name: 'Coderhouse', offer: '20% Beca en Cursos', logo: '💻', description: 'Formación continua para tu equipo.' },
];

const Club: React.FC = () => {
    const [view, setView] = useState<ClubView>('home');

    const handleReserve = (spaceName: string) => {
        alert(`¡Solicitud de reserva enviada para ${spaceName}!\n\nRecibirás la confirmación y el código de acceso QR en tu email.`);
    };

    const handleClaimBenefit = (partnerName: string) => {
        alert(`¡Has reclamado el beneficio de ${partnerName}!\n\nTe enviamos las instrucciones de activación a tu mensajería.`);
    };

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
                return (
                     <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Espacios Físicos 🏢</h2>
                        <p className="text-slate-600 mb-6">Reserva oficinas, salas de reunión o escritorios en nuestros Hubs y espacios aliados.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {spacesData.map(space => (
                                <div key={space.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
                                    <img src={space.image} alt={space.name} className="w-full h-48 object-cover" />
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-slate-800">{space.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${space.capacity === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {space.capacity}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4">📍 {space.location}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {space.amenities.map(amenity => (
                                                <span key={amenity} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{amenity}</span>
                                            ))}
                                        </div>
                                        <Button className="w-full" onClick={() => handleReserve(space.name)}>
                                            📅 Reservar Espacio
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'recursos':
                return (
                     <div>
                        <BackButton />
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Asociados y Beneficios 🎁</h2>
                        <p className="text-slate-600 mb-6">Herramientas y descuentos exclusivos gracias a nuestros partners corporativos.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {partnersData.map(partner => (
                                <Card key={partner.id} className="flex items-start gap-4 hover:border-teal-200 transition-colors">
                                    <div className="text-4xl p-2 bg-slate-50 rounded-lg">{partner.logo}</div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{partner.name}</h4>
                                        <p className="text-teal-600 font-bold text-sm mb-1">{partner.offer}</p>
                                        <p className="text-slate-500 text-sm mb-3">{partner.description}</p>
                                        <Button size="sm" variant="secondary" onClick={() => handleClaimBenefit(partner.name)}>
                                            Reclamar Beneficio
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
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
