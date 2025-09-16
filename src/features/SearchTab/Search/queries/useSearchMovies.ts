import { useInfiniteQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { BASE_URL } from "@env";
import { useLocaleStore } from "~/shared/stores";

const queryId = "SEARCH_MOVIES";

const useSearchMovies = (queryString: string) => {
  const { userLocale } = useLocaleStore();
  return useInfiniteQuery({
    queryKey: [queryId, queryString],
    enabled: queryString.length > 0,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(
        `${BASE_URL}/search/movie?query=${queryString}&include_adult=false&language=${userLocale.languageTag}&page=${pageParam}`,
      );
      return data;
    },
    getNextPageParam: lastPage => lastPage.nextCursor,
  });
};

export default useSearchMovies;
