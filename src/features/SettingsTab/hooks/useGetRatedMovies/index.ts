import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "~/shared/stores";
import useSecureStore from "~/shared/stores/useSecureStore";
import useUserStore from "~/shared/stores/useUserStore";
import getRatedMovies from "../../api/getRatedMovies";

export const getRatedMoviesQueryId = "GET_RATED_MOVIES";
const useGetRatedMovies = () => {
  const { userLocale } = useLocaleStore();
  const { getValue, keys } = useSecureStore();
  const { accountId } = useUserStore();

  return useInfiniteQuery({
    queryKey: [getRatedMoviesQueryId],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const sessionId = await getValue(keys.SESSION_ID);
      if (!accountId || !sessionId) return [];

      const data = await getRatedMovies({
        accountId,
        language: userLocale.languageTag,
        page: pageParam,
      });

      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
};

export default useGetRatedMovies;
