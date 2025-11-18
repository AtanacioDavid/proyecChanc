import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { User } from '../types';
import { ChancLogo } from '../constants';
import { API_BASE_URL } from '../config';

interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegisterSuccess: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
        const res = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Error al registrar el usuario');
        }

        onRegisterSuccess(data);

    } catch (err: any) {
        if (err instanceof TypeError) {
            setError('No se pudo conectar con el servidor. Por favor, revisa tu conexión e inténtalo de nuevo.');
        } else {
            setError(err.message || 'Ocurrió un error inesperado.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
            <div className="mb-8">
                <ChancLogo />
            </div>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input 
                    label="Correo Electrónico"
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input 
                    label="Contraseña"
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña segura"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
            </form>
            <div className="mt-6 text-center text-sm space-y-4">
                <p className="text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <button onClick={onSwitchToLogin} className="font-semibold text-rose-600 hover:underline">
                        Inicia Sesión
                    </button>
                </p>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;