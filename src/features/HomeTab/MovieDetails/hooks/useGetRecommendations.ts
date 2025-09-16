import { useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "~/shared/stores";
import getRecommendations from "../api/getRecommendations";

const queryId = "FETCH_RELATED_MOVIE_RECOMMENDATIONS";

const useFetchRecommendations = (id: number) => {
  const { userLocale } = useLocaleStore();
  return useQuery({
    queryKey: [queryId, id],
    queryFn: async () => {
      const page = 1;

      const results = await getRecommendations({
        id,
        page,
        languageTag: userLocale.languageTag,
      });

      return results as Movie[];
    },
  });
};

export default useFetchRecommendations;
