import { PhoneValidationResult } from '../types/auth';

const PERU_PREFIXES = ['901', '902', '903', '904', '905', '906', '907', '908', '909',
                      '911', '912', '913', '914', '915', '916', '917', '918', '919',
                      '920', '921', '922', '923', '924', '925', '926', '927', '928', '929',
                      '931', '932', '933', '934', '935', '936', '937', '938', '939',
                      '941', '942', '943', '944', '945', '946', '947', '948', '949',
                      '951', '952', '953', '954', '955', '956', '957', '958', '959',
                      '961', '962', '963', '964', '965', '966', '967', '968', '969',
                      '971', '972', '973', '974', '975', '976', '977', '978', '979',
                      '981', '982', '983', '984', '985', '986', '987', '988', '989',
                      '991', '992', '993', '994', '995', '996', '997', '998', '999'];

export const validatePeruPhone = (phone: string): PhoneValidationResult => {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Check if it starts with 9
  if (!cleanPhone.startsWith('9')) {
    return {
      isValid: false,
      error: 'El número debe comenzar con 9'
    };
  }

  // Get the first 3 digits
  const prefix = cleanPhone.slice(0, 3);

  // Check if it's a valid Peru mobile prefix
  if (!PERU_PREFIXES.includes(prefix)) {
    return {
      isValid: false,
      error: 'Prefijo no válido para Perú'
    };
  }

  // Check length
  if (cleanPhone.length > 9) {
    return {
      isValid: false,
      error: 'El número no debe exceder 9 dígitos'
    };
  }

  // If we have exactly 3 digits, suggest auto-completion
  if (cleanPhone.length === 3) {
    const suggestions = PERU_PREFIXES
      .filter(p => p.startsWith(prefix))
      .slice(0, 5);
    return {
      isValid: true,
      suggestions
    };
  }

  // For complete numbers
  if (cleanPhone.length === 9) {
    return {
      isValid: true,
      formattedNumber: cleanPhone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
    };
  }

  // For incomplete numbers
  return {
    isValid: true,
    partialNumber: cleanPhone
  };
};