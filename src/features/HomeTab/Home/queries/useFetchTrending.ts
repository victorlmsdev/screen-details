import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";

const queryId = "FETCH_TRENDING";

const useFetchTrending = () => {
  const { userLocale } = useLocaleStore();
  return useQuery({
    queryKey: [queryId, userLocale.languageTag],
    queryFn: async () => {
      const url = "trending/movie/week";

      const page = 1;
      const { data } = await api.get<MovieResponse>(
        `${url}?language=${userLocale.languageTag}&page=${page}`,
      );

      return data.results.slice(0, 7);
    },
  });
};

export default useFetchTrending;
