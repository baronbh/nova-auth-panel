import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import medicalIcon from "@/assets/medical-icon.png";

const ForgotUsername = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);
    
    if (!result.success) {
      setEmailError(t("reset.email.error"));
      return;
    }
    
    setEmailError("");
    toast({
      title: t("reset.toast.title"),
      description: t("reset.toast.description"),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        <Card className="w-full shadow-xl">
          <CardContent className="p-8">
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

            <h1 className="text-3xl font-bold mb-6 text-foreground">
              {t("reset.title")}
            </h1>

            <p className="text-sm text-muted-foreground mb-6">
              {t("reset.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t("reset.email")}
                </Label>
                <p className="text-sm text-muted-foreground italic mb-2">
                  {t("reset.email.placeholder")}
                </p>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className={emailError ? "border-destructive" : ""}
                />
                {emailError && (
                  <p className="text-sm text-destructive">{emailError}</p>
                )}
              </div>

              <p className="text-sm text-foreground">
                {t("reset.info")}
              </p>

              <Button type="submit" className="w-full">
                {t("reset.button")}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-primary hover:underline text-sm"
                >
                  {t("reset.return")}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotUsername;
