import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";

const queryId = "FETCH_NOW_THEATERS";

const useFetchNowTheaters = () => {
  const { userLocale } = useLocaleStore();

  return useQuery({
    queryKey: [queryId, userLocale.languageTag],
    queryFn: async () => {
      const url = "/movie/now_playing";

      const page = 1;

      const { data } = await api.get<MovieResponse>(
        `${url}?language=${userLocale.languageTag}&page=${page}`,
      );

      return data.results.slice(0, 7);
    },
  });
};

export default useFetchNowTheaters;
