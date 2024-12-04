import React, { useState } from 'react';
import { Shield, User as UserIcon, Settings, Activity, ExternalLink } from 'lucide-react';
import { ProfileEditor } from '../components/profile/ProfileEditor';
import { findUser } from '../utils/storage';
import { User } from '../types/auth';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

export function Dashboard({ userName, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<'main' | 'profile'>('main');
  const user = findUser(userName.split(' ')[0]) as User;

  const handleProfileUpdate = (updatedUser: User) => {
    // Refresh the page to show updated data
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Panel Principal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bienvenido, {userName}</span>
              <button
                onClick={onLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'main' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Panel de Control
                </h2>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ingresa a tu sistema de seguridad</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setActiveSection('profile')}
                  className="bg-blue-50 p-6 rounded-lg text-left hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">Perfil</h3>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Gestiona tu información personal y preferencias.
                  </p>
                </button>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-indigo-800">Actividad</h3>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Revisa tu historial de actividades recientes.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-800">Configuración</h3>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Personaliza las opciones de tu cuenta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
              <button
                onClick={() => setActiveSection('main')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Volver al panel
              </button>
            </div>
            <ProfileEditor user={user} onUpdate={handleProfileUpdate} />
          </div>
        )}
      </div>
    </div>
  );
}