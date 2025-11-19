import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe size={18} />
          <span>{language === "en" ? "English" : "Español"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
