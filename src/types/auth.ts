export interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email?: string;
  password: string;
  role: 'user' | 'admin';
  photoUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  verificationStep: 'phone' | 'code' | 'complete';
  verificationCode: string;
}

export type LoginIdentifier = {
  identifier: string; // can be either email or phone
  password: string;
}

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
  formattedNumber?: string;
  partialNumber?: string;
}