
import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Page } from '../types';

interface HomeProps {
    setActivePage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  const features = [
    { text: 'Tu talento crea oportunidades', emoji: '✨' },
    { text: 'Conecta con talento', emoji: '🤝' },
    { text: 'Haz crecer tus ideas', emoji: '🚀' },
    { text: 'Impacta en tu comunidad', emoji: '🌍' },
    { text: 'Valida tus habilidades', emoji: '🛡️' },
  ];

  const featuredProjects = [
    { title: 'EcoTech', description: 'Soluciones sostenibles para un futuro verde.' },
    { title: 'ConnectApp', description: 'Red social para conectar con profesionales locales.' },
    { title: 'SaludDigital', description: 'Plataforma de telemedicina accesible.' },
  ];

  return (
    <div>
      <div className="flex justify-end gap-2 mb-8">
        <Button variant="secondary" size="sm" onClick={() => setActivePage('Login')}>Iniciar Sesión</Button>
        <Button size="sm" onClick={() => setActivePage('Register')}>Registrarse</Button>
      </div>
      <div className="space-y-12">
        <section className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Aquí comienza tu camino.</h1>
          <p className="mt-4 text-2xl md:text-3xl font-light text-rose-600">
            No esperes a que te den la oportunidad, <span className="font-semibold">créala.</span> ✨
          </p>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-6">🌟 Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-teal-700">{project.title}</h3>
                <p className="mt-2 text-slate-600">{project.description}</p>
                <Button variant="secondary" className="mt-4 w-full">Ver más</Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;