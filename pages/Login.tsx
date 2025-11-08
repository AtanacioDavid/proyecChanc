
import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Page } from '../types';

interface LoginProps {
    setActivePage: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ setActivePage }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
    console.log('Iniciando sesión...');
    setActivePage('Inicio'); // Redirigir a inicio después del login
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Bienvenido de vuelta</h1>
                <p className="text-slate-500">Inicia sesión para continuar</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="••••••••"
                    required
                />
                 <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-rose-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <Button type="submit" className="w-full" size="lg">
                    Ingresar
                </Button>
            </form>
            <div className="mt-6 text-center text-sm">
                <p className="text-slate-600">
                    ¿No tienes una cuenta?{' '}
                    <button onClick={() => setActivePage('Register')} className="font-semibold text-rose-600 hover:underline">
                        Regístrate
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

export default Login;
