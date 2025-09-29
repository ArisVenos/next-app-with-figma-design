import { ReactNode, createContext, useContext } from "react";
import "../../i18n/config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface TranslationContextType {
  activeLanguage: string;
  toggleLanguage: () => void;
  translate: (message: string, item?: any) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const activeLanguage = i18next.language;

  const toggleLanguage = () => {
    activeLanguage === "en"
      ? i18next.changeLanguage("el")
      : i18next.changeLanguage("en");
  };

  const translate = (message: string, id?: string) => {
    return t(message, { id });
  };

  const value = {
    activeLanguage,
    toggleLanguage,
    translate,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useCustomTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useContext must be used inside the Provider");
  }
  return context;
}
