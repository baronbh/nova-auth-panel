import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { CreateAccountForm } from "./CreateAccountForm";
import { useLanguage } from "@/contexts/LanguageContext";

export const AuthTabs = () => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="signin" className="text-base">
          {t("auth.signin")}
        </TabsTrigger>
        <TabsTrigger value="create" className="text-base">
          {t("auth.createAccount")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin" className="space-y-4 animate-fade-in">
        <SignInForm />
      </TabsContent>
      <TabsContent value="create" className="space-y-4 animate-fade-in">
        <CreateAccountForm />
      </TabsContent>
    </Tabs>
  );
};
