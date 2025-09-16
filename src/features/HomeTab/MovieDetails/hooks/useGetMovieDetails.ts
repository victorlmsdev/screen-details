import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";
import getMovieDetails from "../api/getMovieDetails";

export const fetchMovieDetailsQueryId = "FETCH_MOVIE_DETAILS";

const useGetMovieDetails = (id: number) => {
  const { userLocale } = useLocaleStore();

  return useQuery({
    queryKey: [fetchMovieDetailsQueryId, id],
    queryFn: async () => {
      const movieDetails = await getMovieDetails({
        id,
        languageTag: userLocale.languageTag,
      });

      return movieDetails;
    },
  });
};

export default useGetMovieDetails;
