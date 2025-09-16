import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";
import getVideos from "../api/getVideos";

const queryId = "FETCH_MOVIE_VIDEOS";

const useFetchVideos = (id: number) => {
  const { userLocale } = useLocaleStore();
  return useQuery({
    queryKey: [queryId, id],
    queryFn: async () => {
      const { results } = await getVideos({
        id,
        languageTag: userLocale.languageTag,
      });

      if (!results) throw new Error("Couldn't find any videos");

      return results as Video[];
    },
  });
};

export default useFetchVideos;
