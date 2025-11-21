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

const ForgotPassword = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    // Validate username
    if (username.trim() === "") {
      setUsernameError(t("password.username.error"));
      hasError = true;
    }
    
    // Validate email
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);
    
    if (!result.success) {
      setEmailError(t("password.email.error"));
      hasError = true;
    }
    
    if (hasError) return;
    
    setUsernameError("");
    setEmailError("");
    toast({
      title: t("password.toast.title"),
      description: t("password.toast.description"),
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
            <h1 className="text-3xl font-bold mb-6 text-foreground">
              {t("password.title")}
            </h1>

            <p className="text-sm text-muted-foreground mb-6">
              {t("password.description")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  {t("password.username")}
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError("");
                  }}
                  className={usernameError ? "border-destructive" : ""}
                />
                {usernameError && (
                  <p className="text-sm text-destructive">{usernameError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t("password.email")}
                </Label>
                <p className="text-sm text-muted-foreground italic mb-2">
                  {t("password.email.placeholder")}
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

              <Button type="submit" className="w-full">
                {t("password.button")}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-primary hover:underline text-sm"
                >
                  {t("password.return")}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
