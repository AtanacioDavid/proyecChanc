
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
              Si la oportunidad no llega, <br />
              <span className="text-rose-600">constrúyela tú mismo.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-light text-slate-600 max-w-3xl mx-auto">
              Transforma la falta de experiencia en proyectos reales.
              Valida tus habilidades, gana confianza ejecutando ideas y consolida tu propio equipo.
              <br/>
              <span className="font-semibold text-teal-700">Tu CV ya no es un papel, es lo que eres capaz de hacer.</span>
            </p>
            <div className="mt-8">
              <Button size="lg" onClick={onSwitchToRegister}>
                Comenzar a Crear ✨
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Más que una plataforma, una mentalidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-slate-800">De Junior a Fundador</h3>
                <p className="mt-2 text-slate-600">¿No encuentras trabajo? No importa. Lanza tu propio proyecto, gana tracción y demuéstrale al mercado tu valor real.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-slate-800">Confianza Validada</h3>
                <p className="mt-2 text-slate-600">Cada avance en tu proyecto es una validación. Gana seguridad ejecutando y recibiendo feedback real de la comunidad.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-slate-800">CV Digital Dinámico</h3>
                <p className="mt-2 text-slate-600">Olvídate del PDF estático. Muestra un portafolio vivo con insignias, equipos formados y logros tangibles.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">🌟 Proyectos que nacieron aquí</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-t-4 border-teal-500">
                  <h3 className="text-xl font-bold text-teal-700">{project.title}</h3>
                  <p className="mt-2 text-slate-600">{project.description}</p>
                   <div className="text-right mt-4 text-rose-500 font-semibold text-sm">
                       Ver evolución &rarr;
                   </div>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="bg-rose-50 rounded-2xl py-16 shadow-inner">
            <div className="container mx-auto px-6 text-center">
                <blockquote className="max-w-4xl mx-auto text-slate-700 italic text-lg md:text-xl space-y-4">
                    <p>Aquí están los jóvenes valientes. Los que no esperan a que alguien les dé una oportunidad.</p>
                    <p>Los que deciden emprender, sumarse a un proyecto, construir desde cero. Los que no aceptan el “no tenés experiencia” como respuesta.</p>
                    <p>Los que forman equipos sólidos, sueñan en grande y actúan en consecuencia.</p>
                    <p className="font-semibold text-rose-600 not-italic text-2xl mt-6">"El talento joven no se espera. Se activa."</p>
                </blockquote>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white mt-20 border-t border-slate-200">
         <div className="container mx-auto px-6 py-8 text-center text-slate-600">
            <div className="inline-block mb-4">
              <ChancLogo />
            </div>
            <div>
                <p>&copy; {new Date().getFullYear()} Chance. Todos los derechos reservados.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Landing;
