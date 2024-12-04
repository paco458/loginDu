import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  userName: string;
  onClose: () => void;
}

export function SuccessModal({ userName, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Registro Exitoso!
          </h3>
          <p className="text-gray-600">
            Bienvenido, {userName}. Tu cuenta ha sido creada correctamente.
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}