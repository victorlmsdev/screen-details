import { useEffect, useState } from "react";
import * as Translations from "~/config/translations";
import { useLocaleStore } from "../stores";

const useTranslation = () => {
  const { userLocale } = useLocaleStore();

  const [translation, setTranslation] = useState(Translations.ptBR);

  useEffect(() => {
    const { languageCode, regionCode } = userLocale;

    if (languageCode && regionCode) {
      const translationKey =
        `${languageCode}${regionCode}` as keyof typeof Translations;

      if (Translations[translationKey]) {
        setTranslation(Translations[translationKey]);
      }
    }
  }, [userLocale]);

  function translate(key: keyof Translation) {
    if (translation[key]) return translation[key];
    return "";
  }

  function getPageTranslations(key: keyof Translation) {
    return translation[key];
  }

  return { translate, getPageTranslations };
};

export default useTranslation;
