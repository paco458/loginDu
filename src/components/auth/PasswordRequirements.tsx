import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    { test: /.{8,}/, text: 'Mínimo 8 caracteres' },
    { test: /[A-Z]/, text: 'Una letra mayúscula' },
    { test: /[a-z]/, text: 'Una letra minúscula' },
    { test: /[0-9]/, text: 'Un número' },
    { test: /[^A-Za-z0-9]/, text: 'Un carácter especial' },
  ];

  return (
    <div className="space-y-2 text-sm">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center space-x-2">
          {req.test.test(password) ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-500" />
          )}
          <span className={req.test.test(password) ? 'text-green-600' : 'text-gray-600'}>
            {req.text}
          </span>
        </div>
      ))}
    </div>
  );
}