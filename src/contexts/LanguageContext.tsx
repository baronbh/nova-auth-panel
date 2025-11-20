import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    "app.title": "Patient Portal",
    "app.subtitle": "Secure access to your healthcare information",
    "auth.signin": "Sign In",
    "auth.createAccount": "Create Account",
    "signin.username": "Username (required)",
    "signin.username.placeholder": "Enter your username",
    "signin.username.required": "Username is required",
    "signin.password": "Password (required)",
    "signin.password.placeholder": "Enter your password",
    "signin.password.required": "Password is required",
    "signin.showPassword": "Show Password",
    "signin.button": "Sign In",
    "signin.forgotUsername": "Forgot Username?",
    "signin.forgotPassword": "Forgot Password?",
    "signin.toast.title": "Sign In",
    "signin.toast.description": "Signing in as {username}...",
    "create.username": "Username",
    "create.username.placeholder": "Choose a username",
    "create.username.error": "Username must be at least 3 characters",
    "create.email": "Email",
    "create.email.placeholder": "your.email@example.com",
    "create.email.error": "Invalid email address",
    "create.password": "Password",
    "create.password.placeholder": "Create a strong password",
    "create.password.error": "Password must be at least 8 characters",
    "create.confirmPassword": "Confirm Password",
    "create.confirmPassword.placeholder": "Re-enter your password",
    "create.confirmPassword.error": "Passwords don't match",
    "create.button": "Create Account",
    "create.toast.title": "Account Created",
    "create.toast.description": "Welcome, {username}!",
    "footer.agreement": "By signing in, you agree to our",
    "footer.terms": "Terms of Service",
    "footer.and": "and",
    "footer.privacy": "Privacy Policy",
    "footer.needHelp": "Need help?",
    "footer.contact": "Contact Support",
    "reset.title": "Reset Credentials",
    "reset.description": "An email address must be connected to your account in order to reset your username. Please contact the hospital if you do not have an email address connected to your account.",
    "reset.email": "Email Address (required)",
    "reset.email.placeholder": "example: email@example.com",
    "reset.email.error": "Invalid email address",
    "reset.info": "This will reset both your username and your password.",
    "reset.button": "Reset credentials",
    "reset.return": "Return to Sign in page",
    "reset.toast.title": "Reset Request Sent",
    "reset.toast.description": "Check your email for instructions to reset your credentials.",
  },
  es: {
    "app.title": "Portal del Paciente",
    "app.subtitle": "Acceso seguro a su información médica",
    "auth.signin": "Iniciar Sesión",
    "auth.createAccount": "Crear Cuenta",
    "signin.username": "Usuario (requerido)",
    "signin.username.placeholder": "Ingrese su usuario",
    "signin.username.required": "El usuario es requerido",
    "signin.password": "Contraseña (requerida)",
    "signin.password.placeholder": "Ingrese su contraseña",
    "signin.password.required": "La contraseña es requerida",
    "signin.showPassword": "Mostrar Contraseña",
    "signin.button": "Iniciar Sesión",
    "signin.forgotUsername": "¿Olvidó su Usuario?",
    "signin.forgotPassword": "¿Olvidó su Contraseña?",
    "signin.toast.title": "Iniciar Sesión",
    "signin.toast.description": "Iniciando sesión como {username}...",
    "create.username": "Usuario",
    "create.username.placeholder": "Elija un usuario",
    "create.username.error": "El usuario debe tener al menos 3 caracteres",
    "create.email": "Correo Electrónico",
    "create.email.placeholder": "su.correo@ejemplo.com",
    "create.email.error": "Dirección de correo electrónico inválida",
    "create.password": "Contraseña",
    "create.password.placeholder": "Cree una contraseña segura",
    "create.password.error": "La contraseña debe tener al menos 8 caracteres",
    "create.confirmPassword": "Confirmar Contraseña",
    "create.confirmPassword.placeholder": "Vuelva a ingresar su contraseña",
    "create.confirmPassword.error": "Las contraseñas no coinciden",
    "create.button": "Crear Cuenta",
    "create.toast.title": "Cuenta Creada",
    "create.toast.description": "¡Bienvenido, {username}!",
    "footer.agreement": "Al iniciar sesión, acepta nuestros",
    "footer.terms": "Términos de Servicio",
    "footer.and": "y",
    "footer.privacy": "Política de Privacidad",
    "footer.needHelp": "¿Necesita ayuda?",
    "footer.contact": "Contactar Soporte",
    "reset.title": "Restablecer Credenciales",
    "reset.description": "Una dirección de correo electrónico debe estar conectada a su cuenta para restablecer su nombre de usuario. Por favor contacte al hospital si no tiene una dirección de correo electrónico conectada a su cuenta.",
    "reset.email": "Dirección de Correo Electrónico (requerida)",
    "reset.email.placeholder": "ejemplo: correo@ejemplo.com",
    "reset.email.error": "Dirección de correo electrónico inválida",
    "reset.info": "Esto restablecerá tanto su nombre de usuario como su contraseña.",
    "reset.button": "Restablecer credenciales",
    "reset.return": "Regresar a la página de inicio de sesión",
    "reset.toast.title": "Solicitud de Restablecimiento Enviada",
    "reset.toast.description": "Revise su correo electrónico para obtener instrucciones para restablecer sus credenciales.",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language][key as keyof typeof translations.en] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value);
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};