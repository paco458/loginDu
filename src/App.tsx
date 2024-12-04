import React, { useState, useCallback } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { PhoneVerification } from './components/auth/PhoneVerification';
import { CodeVerification } from './components/auth/CodeVerification';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { SuccessModal } from './components/auth/SuccessModal';
import { Dashboard } from './pages/Dashboard';
import { Shield } from 'lucide-react';
import { saveUser, findUser } from './utils/storage';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'login' | 'phone' | 'code' | 'register'>('login');
  const [adminMode, setAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredName, setRegisteredName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  const handleEmptyAreaClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 300) {
        setClickCount(prev => prev + 1);
        if (clickCount >= 1) {
          setAdminMode(true);
        }
      } else {
        setClickCount(1);
      }
      setLastClickTime(currentTime);
    }
  }, [clickCount, lastClickTime]);

  const handleLogin = (data: { identifier: string; password: string }) => {
    const user = findUser(data.identifier);
    if (user && user.password === data.password) {
      setCurrentUser(`${user.firstName} ${user.lastName}`);
      setIsLoggedIn(true);
    }
  };

  const handlePhoneVerification = (phone: string) => {
    setPhoneNumber(phone);
    setVerificationStep('code');
  };

  const handleCodeVerification = (code: string) => {
    console.log('Code verification:', code);
    setVerificationStep('register');
  };

  const handleRegistration = (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    const user = {
      ...data,
      role: 'user' as const
    };
    
    saveUser(user);
    setRegisteredName(`${data.firstName} ${data.lastName}`);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setVerificationStep('login');
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setVerificationStep('login');
  };

  if (isLoggedIn) {
    return <Dashboard userName={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      onClick={handleEmptyAreaClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {verificationStep === 'register' ? 'Completar registro' :
             isRegistering ? 'Crear cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-gray-600 mt-2">
            {verificationStep === 'register' ? 'Complete sus datos para finalizar el registro' :
             verificationStep === 'phone' ? 'Ingrese su número de teléfono para verificación' :
             verificationStep === 'code' ? 'Ingrese el código de verificación' :
             isRegistering ? 'Regístrese para comenzar' : 'Inicie sesión para continuar'}
          </p>
          {adminMode && (
            <div className="mt-2 text-sm text-blue-600 font-medium">
              Modo Administrador Activado
            </div>
          )}
        </div>

        {verificationStep === 'login' && (
          <LoginForm
            onSubmit={handleLogin}
            onRegister={() => {
              setIsRegistering(true);
              setVerificationStep('phone');
            }}
          />
        )}

        {verificationStep === 'phone' && (
          <PhoneVerification onVerify={handlePhoneVerification} />
        )}

        {verificationStep === 'code' && (
          <CodeVerification onVerify={handleCodeVerification} />
        )}

        {verificationStep === 'register' && (
          <RegistrationForm
            phoneNumber={phoneNumber}
            onSubmit={handleRegistration}
          />
        )}

        {verificationStep !== 'login' && (
          <button
            onClick={() => {
              setVerificationStep('login');
              setIsRegistering(false);
            }}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            ← Volver al inicio de sesión
          </button>
        )}

        {showSuccess && (
          <SuccessModal
            userName={registeredName}
            onClose={handleSuccessClose}
          />
        )}
      </div>
    </div>
  );
}

export default App;