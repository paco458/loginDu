import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { validatePeruPhone } from '../../utils/phoneValidation';

interface PhoneVerificationProps {
  onVerify: (phone: string) => void;
}

export function PhoneVerification({ onVerify }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handlePhoneChange = (value: string) => {
    const result = validatePeruPhone(value);
    
    setError(result.error || '');
    setSuggestions(result.suggestions || []);
    
    if (result.formattedNumber) {
      setPhoneNumber(result.formattedNumber);
    } else if (result.partialNumber) {
      setPhoneNumber(result.partialNumber);
    } else {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePeruPhone(phoneNumber);
    
    if (!result.isValid) {
      setError(result.error || 'Número no válido');
      return;
    }
    
    if (result.formattedNumber) {
      onVerify(result.formattedNumber.replace(/\s/g, ''));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handlePhoneChange(suggestion);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingrese su número de teléfono"
          maxLength={11} // Account for spaces in formatted number
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={!!error || phoneNumber.length < 9}
        className={`w-full py-2 rounded-lg transition-colors ${
          error || phoneNumber.length < 9
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Verificar número
      </button>

      <p className="text-sm text-gray-600 text-center">
        El número debe comenzar con 9 y tener 9 dígitos
      </p>
    </form>
  );
}