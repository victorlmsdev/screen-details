import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useGenreStore, useLocaleStore } from "~/shared/stores";

const queryId = "FETCH_GENRES";

const useFetchGenres = () => {
  const genreStore = useGenreStore();
  const { userLocale } = useLocaleStore();

  return useQuery({
    queryKey: [queryId],
    queryFn: async () => {
      const { data } = await api.get(
        `/genre/movie/list?language=${userLocale.languageTag}`,
      );

      if (!data.genre) throw new Error("couldn't fetch genres");

      genreStore.setGenres(data.genre);
    },
  });
};

export default useFetchGenres;
