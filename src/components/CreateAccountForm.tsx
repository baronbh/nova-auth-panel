import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const CreateAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const createAccountSchema = z
    .object({
      username: z.string().min(3, t("create.username.error")),
      email: z.string().email(t("create.email.error")),
      password: z.string().min(8, t("create.password.error")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("create.confirmPassword.error"),
      path: ["confirmPassword"],
    });

  type CreateAccountFormData = z.infer<typeof createAccountSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = (data: CreateAccountFormData) => {
    const description = t("create.toast.description").replace("{username}", data.username);
    toast({
      title: t("create.toast.title"),
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="create-username" className="text-sm font-medium">
          {t("create.username")}
        </Label>
        <Input
          id="create-username"
          type="text"
          {...register("username")}
          className="h-12"
          placeholder={t("create.username.placeholder")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="create-email" className="text-sm font-medium">
          {t("create.email")}
        </Label>
        <Input
          id="create-email"
          type="email"
          {...register("email")}
          className="h-12"
          placeholder={t("create.email.placeholder")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="create-password" className="text-sm font-medium">
          {t("create.password")}
        </Label>
        <div className="relative">
          <Input
            id="create-password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="h-12 pr-10"
            placeholder={t("create.password.placeholder")}
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

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-sm font-medium">
          {t("create.confirmPassword")}
        </Label>
        <Input
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword")}
          className="h-12"
          placeholder={t("create.confirmPassword.placeholder")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium">
        {t("create.button")}
      </Button>
    </form>
  );
};
