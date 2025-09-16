import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";
import { useLocaleStore } from "~/shared/stores";

const queryId = "SET_USER_LOCALE";

const useSetUserLocale = () => {
  const { setLocale } = useLocaleStore();

  return useQuery({
    queryKey: [queryId],
    queryFn: async () => {
      const { languageCode, languageTag, regionCode } = getLocales()[0];

      setLocale({
        languageCode,
        languageTag,
        regionCode,
      });

      return true;
    },
  });
};

export default useSetUserLocale;
