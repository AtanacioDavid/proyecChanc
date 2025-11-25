
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Page, User } from '../types';

interface ProfileProps {
    setActivePage: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ setActivePage }) => {
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState('Apasionado por la tecnología y la innovación social. Siempre buscando nuevos retos y equipos con los que colaborar.');
    const [isEditingBio, setIsEditingBio] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div>Cargando perfil...</div>;

    const interests = ['Tecnológico', 'Social', 'Educación'];
    
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Cabecera del Perfil */}
            <div className="relative mb-16">
                <div className="h-48 bg-gradient-to-r from-rose-400 to-teal-400 rounded-xl shadow-md"></div>
                <div className="absolute -bottom-12 left-8 flex items-end">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=f43f5e&color=fff&size=128`} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                    />
                    <div className="mb-2 ml-4">
                        <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                        <p className="text-slate-600 font-medium">@{user.name.replace(/\s+/g, '').toLowerCase()}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Columna Izquierda: Info Personal */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold text-slate-800 mb-3">Sobre mí</h3>
                        {isEditingBio ? (
                            <div className="space-y-2">
                                <textarea 
                                    className="w-full border rounded p-2 text-sm" 
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                <Button size="sm" onClick={() => setIsEditingBio(false)}>Guardar</Button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-slate-600 text-sm italic">"{bio}"</p>
                                <button onClick={() => setIsEditingBio(true)} className="text-xs text-rose-500 hover:underline mt-2">Editar biografía</button>
                            </div>
                        )}
                    </Card>

                    <Card>
                        <h3 className="font-bold text-slate-800 mb-3">Intereses</h3>
                        <div className="flex flex-wrap gap-2">
                            {interests.map(tag => (
                                <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-slate-800 mb-3">Estadísticas</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex justify-between"><span>❤️ Likes recibidos</span> <span className="font-bold">142</span></li>
                            <li className="flex justify-between"><span>🚀 Proyectos</span> <span className="font-bold">3</span></li>
                            <li className="flex justify-between"><span>🤝 Colaboraciones</span> <span className="font-bold">5</span></li>
                        </ul>
                    </Card>
                </div>

                {/* Columna Derecha: Contenido Principal */}
                <div className="md:col-span-2 space-y-6">
                    {/* Llamada a la Acción: CV Profesional */}
                    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold">¿Buscas mi perfil profesional?</h2>
                            <p className="text-slate-300 text-sm mt-1">Accede a mi portafolio detallado con experiencia validada.</p>
                        </div>
                        <Button 
                            className="bg-rose-500 hover:bg-rose-600 border-none shrink-0"
                            onClick={() => setActivePage('CV Digital')}
                        >
                            Ver CV Digital Completo &rarr;
                        </Button>
                    </div>

                    <Card>
                        <h3 className="font-bold text-xl text-slate-800 mb-4">Insignias Destacadas 🏆</h3>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="text-3xl">🚀</div>
                                <div>
                                    <h4 className="font-bold text-amber-900 text-sm">Innovación Ágil</h4>
                                    <p className="text-xs text-amber-700">Globant</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-3xl">🤝</div>
                                <div>
                                    <h4 className="font-bold text-blue-900 text-sm">Liderazgo</h4>
                                    <p className="text-xs text-blue-700">Comunidad</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                         <h3 className="font-bold text-xl text-slate-800 mb-4">Actividad Reciente</h3>
                         <div className="border-l-2 border-slate-200 pl-4 space-y-6">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-rose-500 rounded-full"></div>
                                <p className="text-sm font-bold text-slate-800">Publicó una actualización en "EcoTech"</p>
                                <p className="text-xs text-slate-500">Hace 2 días</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-teal-500 rounded-full"></div>
                                <p className="text-sm font-bold text-slate-800">Recibió una validación de Ana Gómez</p>
                                <p className="text-xs text-slate-500">Hace 1 semana</p>
                            </div>
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;