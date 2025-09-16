import { useInfiniteQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { BASE_URL } from "@env";
import { useLocaleStore } from "~/shared/stores";

const queryId = "SEARCH_PEOPLE";

const useSearchPeople = (queryString: string) => {
  const { userLocale } = useLocaleStore();
  return useInfiniteQuery({
    queryKey: [queryId, queryString],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(
        `${BASE_URL}/search/person?query=${queryString}&include_adult=false&language=${userLocale.languageTag}&page=${pageParam}`,
      );
      return data;
    },
    getNextPageParam: lastPage => lastPage.nextCursor,
  });
};

export default useSearchPeople;
