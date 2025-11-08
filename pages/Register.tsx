
import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Page } from '../types';

interface RegisterProps {
    setActivePage: (page: Page) => void;
}

const Register: React.FC<RegisterProps> = ({ setActivePage }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de registro aquí
    console.log('Registrando usuario...');
    setActivePage('Inicio'); // Redirigir a inicio después del registro
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Crea tu cuenta</h1>
                <p className="text-slate-500">Únete a la comunidad de Chance</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                    label="Nombre Completo"
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    required
                />
                <Input 
                    label="Correo Electrónico"
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    required
                />
                <Input 
                    label="Contraseña"
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña segura"
                    required
                />
                <Button type="submit" className="w-full" size="lg">
                    Crear Cuenta
                </Button>
            </form>
            <div className="mt-6 text-center text-sm">
                <p className="text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <button onClick={() => setActivePage('Login')} className="font-semibold text-rose-600 hover:underline">
                        Inicia Sesión
                    </button>
                </p>
                <p className="mt-4">
                    <button onClick={() => setActivePage('Inicio')} className="text-slate-500 hover:underline">
                        &larr; Volver al inicio
                    </button>
                </p>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
