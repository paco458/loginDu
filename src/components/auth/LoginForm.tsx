import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { findUser } from '../../utils/storage';

interface LoginFormProps {
  onSubmit: (data: { identifier: string; password: string }) => void;
  onRegister: () => void;
}

export function LoginForm({ onSubmit, onRegister }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = findUser(identifier);
    if (!user) {
      setError('Usuario no encontrado');
      return;
    }
    
    if (user.password !== password) {
      setError('Contraseña incorrecta');
      return;
    }

    onSubmit({ identifier, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Correo electrónico o teléfono"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Contraseña"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}

      <div className="space-y-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
}