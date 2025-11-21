import { AuthTabs } from "@/components/AuthTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import patientPortalLogo from "@/assets/patient-portal-logo.png";
import medicalIcon from "@/assets/medical-icon.png";
import securityBadge from "@/assets/security-badge.png";

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-card rounded-2xl shadow-[var(--card-shadow)] p-8 hover:shadow-[var(--hover-shadow)] transition-shadow duration-500">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                <img 
                  src={medicalIcon} 
                  alt="Medical Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("app.title")}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              {t("app.subtitle")}
            </p>
          </div>

          {/* Authentication Tabs */}
          <AuthTabs />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              {t("footer.agreement")}{" "}
              <a href="#" className="text-primary hover:underline">
                {t("footer.terms")}
              </a>{" "}
              {t("footer.and")}{" "}
              <a href="#" className="text-primary hover:underline">
                {t("footer.privacy")}
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.needHelp")}{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              {t("footer.contact")}
            </a>
          </p>
        </div>
      </div>

      {/* Security Badge */}
      <div className="fixed bottom-6 right-6">
        <img 
          src={securityBadge} 
          alt="Secure Site" 
          className="w-24 h-auto opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
};

export default Index;
