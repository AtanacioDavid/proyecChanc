import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ChancLogo } from '../constants';

interface LandingProps {
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

const Landing: React.FC<LandingProps> = ({ onSwitchToLogin, onSwitchToRegister }) => {
  const featuredProjects = [
    { title: 'EcoTech', description: 'Soluciones sostenibles para un futuro verde.' },
    { title: 'ConnectApp', description: 'Red social para conectar con profesionales locales.' },
    { title: 'SaludDigital', description: 'Plataforma de telemedicina accesible.' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div>
            <ChancLogo />
            <p className="text-xs text-slate-500 italic mt-1">"El talento joven no se espera. Se activa."</p>
          </div>
          <div className="space-x-4">
            <Button variant="secondary" onClick={onSwitchToLogin}>Iniciar Sesión</Button>
            <Button onClick={onSwitchToRegister}>Registrarse</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="space-y-20">
          <section className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Donde las ideas se encuentran con el talento.
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light text-rose-600 max-w-3xl mx-auto">
              No esperes a que te den la oportunidad, <span className="font-semibold">créala</span>.
              Chance es la plataforma que conecta emprendedores con personas talentosas para construir el futuro.
            </p>
            <div className="mt-8">
              <Button size="lg" onClick={onSwitchToRegister}>
                Únete a la comunidad ✨
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">¿Qué es Chance?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-slate-800">Lanza tu Proyecto</h3>
                <p className="mt-2 text-slate-600">Publica tu idea y encuentra el equipo perfecto para hacerla realidad.</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-slate-800">Encuentra Oportunidades</h3>
                <p className="mt-2 text-slate-600">Únete a proyectos innovadores, gana experiencia y construye tu CV digital.</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-xl font-bold text-slate-800">Crea Conexiones</h3>
                <p className="mt-2 text-slate-600">Forma parte de una comunidad de creadores, mentores e inversores.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">🌟 Proyectos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-teal-700">{project.title}</h3>
                  <p className="mt-2 text-slate-600">{project.description}</p>
                   <div className="text-right mt-4 text-rose-500 font-semibold">
                       Ver más &rarr;
                   </div>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="bg-rose-50 rounded-lg py-16">
            <div className="container mx-auto px-6 text-center">
                <blockquote className="max-w-4xl mx-auto text-slate-700 italic text-lg md:text-xl space-y-4">
                    <p>Aquí están los jóvenes valientes. Los que no esperan a que alguien les dé una oportunidad.</p>
                    <p>Los que deciden emprender, sumarse a un proyecto, construir desde cero. Los que no aceptan el “no tenés experiencia” como respuesta.</p>
                    <p>Los que forman equipos sólidos, sueñan en grande y actúan en consecuencia.</p>
                    <p>Para muchos son inexpertos. Para nosotros, son talento con propósito.</p>
                    <p className="font-semibold text-rose-600 not-italic">Porque los jóvenes que se animan a crear su propio camino… son los que están cambiando el mundo.</p>
                </blockquote>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white mt-20">
         <div className="container mx-auto px-6 py-8 text-center text-slate-600">
            <div className="inline-block">
              <ChancLogo />
              <p className="text-xs text-slate-500 italic mt-1">"El talento joven no se espera. Se activa."</p>
            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} Chance. Todos los derechos reservados.</p>
         </div>
      </footer>
    </div>
  );
};

export default Landing;