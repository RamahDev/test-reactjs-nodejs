export const regexPatterns = {
  required: 'Ce champ est requis',
  email: {
    value: /\S+@\S+\.\S+/,
    message: 'Adresse email invalide',
  },
  password: {
    digit: {
      value: /(?=.*\d)/,
      message: 'Le mot de passe doit contenir au moins un chiffre',
    },
    digitOrSpecialCharacter: {
      value: /(?=.*[!@#$%^&*_0-9])/,
      message: 'Le mot de passe doit contenir au moins un chifrre ou un caractère spécial',
    },
    lowerCase: {
      value: /(?=.*[a-z])/,
      message: 'Le mot de passe doit contenir au moins une lettre minuscule',
    },
    upperCase: {
      value: /(?=.*[A-Z])/,
      message: 'Le mot de passe doit contenir au moins une lettre majuscule',
    },
    minLength: {
      value: /\w{8,}/,
      message: 'Le mot de passe doit contenir au moins 8 caractères',
    },
  },
  phone: { value: /^(020|033|034|032)\d{7}$/, message: 'Format téléphone invalide' },
};
