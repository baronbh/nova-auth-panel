import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const signInSchema = z.object({
    username: z.string().min(1, t("signin.username.required")),
    password: z.string().min(1, t("signin.password.required")),
  });

  type SignInFormData = z.infer<typeof signInSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    const description = t("signin.toast.description").replace("{username}", data.username);
    toast({
      title: t("signin.toast.title"),
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          {t("signin.username")}
        </Label>
        <Input
          id="username"
          type="text"
          {...register("username")}
          className="h-12"
          placeholder={t("signin.username.placeholder")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          {t("signin.password")}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="h-12 pr-10"
            placeholder={t("signin.password.placeholder")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showPasswordCheck"
          checked={showPassword}
          onCheckedChange={(checked) => setShowPassword(checked as boolean)}
        />
        <Label htmlFor="showPasswordCheck" className="text-sm cursor-pointer">
          {t("signin.showPassword")}
        </Label>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium">
        {t("signin.button")}
      </Button>

      <div className="space-y-3 text-center">
        <a
          href="#"
          className="block text-sm text-primary hover:underline transition-all"
        >
          {t("signin.forgotUsername")}
        </a>
        <a
          href="#"
          className="block text-sm text-primary hover:underline transition-all"
        >
          {t("signin.forgotPassword")}
        </a>
      </div>
    </form>
  );
};
