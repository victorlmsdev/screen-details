import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { FirebaseService } from "~/shared/services/firebase";
import { useLocaleStore } from "~/shared/stores";

const queryId = "FETCH_RECOMMENDATION";

const useFetchRecommendation = () => {
  const { userLocale } = useLocaleStore();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const movieId = { type: "movie", id: `${month}${day + 1}` };

  const remoteRecommendation = FirebaseService.getRemoteConfigValue(
    "TodayRecommendation",
  ).asString();

  const fetchId = JSON.parse(
    !!remoteRecommendation && remoteRecommendation.length > 0
      ? remoteRecommendation
      : JSON.stringify(movieId),
  );
  console.log("fetchId => ", fetchId);
  return useQuery({
    queryKey: [queryId, fetchId.id, userLocale.languageTag],
    queryFn: async () => {
      const url = `/movie/${fetchId.id}`;
      console.log("url => ", url);
      const { data } = await api.get<MovieDetails>(
        `${url}?language=${userLocale.languageTag}`,
      );

      return data as MovieDetails;
    },
  });
};

export default useFetchRecommendation;
