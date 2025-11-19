import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { CreateAccountForm } from "./CreateAccountForm";

export const AuthTabs = () => {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="signin" className="text-base">
          Sign In
        </TabsTrigger>
        <TabsTrigger value="create" className="text-base">
          Create Account
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
