
import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { Page, User, Education } from '../types';

interface ProfileProps {
    setActivePage: (page: Page) => void;
}

const INTEREST_OPTIONS = ['Tecnológico', 'Social', 'Educación', 'Ambiental', 'Económico', 'Artístico', 'Salud', 'Deportivo'];

const Profile: React.FC<ProfileProps> = ({ setActivePage }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Form States
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [photoUrl, setPhotoUrl] = useState('');
    
    // Education State
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [newEducation, setNewEducation] = useState<Education>({ institution: '', degree: '', year: '' });
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);
            // Cargar datos existentes o defaults
            setBio(parsedUser.bio || '¡Hola! Estoy buscando sumarme a proyectos innovadores.');
            setLocation(parsedUser.location || '');
            setSelectedInterests(parsedUser.interests || []);
            setPhotoUrl(parsedUser.photoUrl || `https://ui-avatars.com/api/?name=${parsedUser.name}&background=f43f5e&color=fff&size=128`);
            setEducationList(parsedUser.education || []);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPhotoUrl(imageUrl);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => 
            prev.includes(interest) 
                ? prev.filter(i => i !== interest) 
                : [...prev, interest]
        );
    };

    // Manejadores de Educación
    const handleAddEducation = () => {
        if (newEducation.institution && newEducation.degree && newEducation.year) {
            setEducationList([...educationList, newEducation]);
            setNewEducation({ institution: '', degree: '', year: '' }); // Limpiar inputs
        } else {
            alert('Por favor completa todos los campos de educación.');
        }
    };

    const handleDeleteEducation = (index: number) => {
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
    };

    const handleSaveProfile = () => {
        if (!user) return;
        setLoading(true);

        // Simulamos guardado en backend actualizando localStorage
        const updatedUser: User = {
            ...user,
            bio,
            location,
            interests: selectedInterests,
            photoUrl,
            education: educationList
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        setTimeout(() => {
            setLoading(false);
            alert('¡Perfil actualizado con éxito! Tu CV Digital y preferencias de búsqueda han sido actualizados.');
            // Opcional: Recargar página para actualizar sidebar si fuera necesario
            window.location.reload(); 
        }, 1000);
    };

    if (!user) return <div>Cargando configuración...</div>;
    
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-rose-500">
                <h1 className="text-2xl font-bold text-slate-800">⚙️ Configuración de Perfil</h1>
                <p className="text-slate-600">Completa tus datos para que las empresas te encuentren y tu CV Digital destaque.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna Izquierda: Foto y Datos Básicos */}
                <div className="space-y-6">
                    <Card className="text-center">
                        <div className="relative inline-block group cursor-pointer" onClick={triggerFileInput}>
                            <img 
                                src={photoUrl} 
                                alt={user.name} 
                                className="w-40 h-40 rounded-full border-4 border-slate-100 shadow-md object-cover mx-auto"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-sm font-bold">📷 Cambiar Foto</span>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mt-4">{user.name}</h2>
                        <p className="text-sm text-slate-500">{user.email}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 text-left">
                            <label className="text-xs font-bold text-slate-500 uppercase">Ubicación</label>
                            <Input 
                                label=""
                                placeholder="Ej: Buenos Aires, Argentina"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <p className="text-xs text-slate-400 mt-1">Sirve para mostrarte proyectos cercanos.</p>
                        </div>
                    </Card>
                </div>

                {/* Columna Derecha: Formulario Detallado */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Sobre mí (Bio para CV)</h3>
                        <Textarea 
                            label=""
                            placeholder="Describe quién eres, qué te apasiona y qué buscas..."
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <p className="text-xs text-slate-400 mt-1 text-right">Este texto aparecerá en la cabecera de tu CV Digital.</p>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Formación Académica</h3>
                        <p className="text-sm text-slate-600 mb-4">Agrega tus estudios formales, cursos o bootcamps.</p>
                        
                        <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg">
                            <Input 
                                label="Institución" 
                                placeholder="Ej. Universidad de Córdoba / Coderhouse"
                                value={newEducation.institution}
                                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                            />
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                    <Input 
                                        label="Título / Curso" 
                                        placeholder="Ej. Ing. Sistemas / Curso React"
                                        value={newEducation.degree}
                                        onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <Input 
                                        label="Año" 
                                        placeholder="2024"
                                        value={newEducation.year}
                                        onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="text-right">
                                <Button size="sm" onClick={handleAddEducation} variant="secondary">
                                    + Agregar Estudio
                                </Button>
                            </div>
                        </div>

                        {educationList.length > 0 ? (
                            <ul className="space-y-3">
                                {educationList.map((edu, idx) => (
                                    <li key={idx} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg">
                                        <div>
                                            <p className="font-bold text-slate-700">{edu.degree}</p>
                                            <p className="text-xs text-slate-500">{edu.institution} ({edu.year})</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteEducation(idx)}
                                            className="text-red-400 hover:text-red-600 font-bold px-2"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-400 text-sm text-center italic">No has agregado formación aún.</p>
                        )}
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg text-slate-800 mb-4">Intereses y Habilidades</h3>
                        <p className="text-sm text-slate-600 mb-3">Selecciona tus áreas de interés para mejorar tus recomendaciones de proyectos y reclutamiento.</p>
                        <div className="flex flex-wrap gap-2">
                            {INTEREST_OPTIONS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => toggleInterest(tag)}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors border ${
                                        selectedInterests.includes(tag)
                                        ? 'bg-teal-600 text-white border-teal-600'
                                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {tag} {selectedInterests.includes(tag) && '✓'}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="secondary" onClick={() => window.location.reload()}>Cancelar cambios</Button>
                        <Button onClick={handleSaveProfile} disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Perfil'}
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-800 text-white p-6 rounded-lg flex justify-between items-center shadow-lg mt-8">
                <div>
                    <h3 className="text-lg font-bold">¿Listo para ver cómo quedó?</h3>
                    <p className="text-slate-300 text-sm">Revisa cómo ven las empresas tu perfil profesional.</p>
                </div>
                <Button className="bg-rose-500 hover:bg-rose-600 border-none" onClick={() => setActivePage('CV Digital')}>
                    Ir a mi CV Digital &rarr;
                </Button>
            </div>
        </div>
    );
};

export default Profile;
