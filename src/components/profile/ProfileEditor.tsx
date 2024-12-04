import React, { useState, useRef } from 'react';
import { Camera, Save } from 'lucide-react';
import { User } from '../../types/auth';
import { updateUser } from '../../utils/storage';

interface ProfileEditorProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export function ProfileEditor({ user, onUpdate }: ProfileEditorProps) {
  const [editedUser, setEditedUser] = useState(user);
  const [photoPreview, setPhotoPreview] = useState<string>(user.photoUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setEditedUser(prev => ({ ...prev, photoUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(editedUser);
    onUpdate(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={editedUser.firstName}
              onChange={e => setEditedUser(prev => ({ ...prev, firstName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input
              type="text"
              value={editedUser.lastName}
              onChange={e => setEditedUser(prev => ({ ...prev, lastName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={editedUser.email || ''}
            onChange={e => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            value={editedUser.phoneNumber}
            onChange={e => setEditedUser(prev => ({ ...prev, phoneNumber: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            value={editedUser.birthDate}
            onChange={e => setEditedUser(prev => ({ ...prev, birthDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Guardar cambios</span>
        </button>
      </div>
    </form>
  );
}