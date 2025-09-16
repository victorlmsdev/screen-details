import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";
import getProviders from "../api/getProviders";

const queryId = "FETCH_MOVIE_PROVIDERS";

const useFetchProviders = (id: number) => {
  const { userLocale } = useLocaleStore();

  return useQuery({
    queryKey: [queryId, id],
    queryFn: async () => {
      const providers = await getProviders({ id });

      const localeResults =
        providers?.results[userLocale.regionCode ?? "US"] ??
        providers?.results["US"];

      if (!localeResults) throw new Error("Couldn't find any providers");

      return localeResults as ProvidersResponse;
    },
  });
};

export default useFetchProviders;
