import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";

type PersonCreditResponse = {
  cast: Movie[];
  crew: Movie[];
};

const queryId = "FETCH_PERSON_CREDITS";

const useFetchPersonCredits = (id: number) => {
  const { userLocale } = useLocaleStore();
  return useQuery({
    queryKey: [queryId, id],
    queryFn: async () => {
      const { data } = await api.get(
        `/person/${id}/movie_credits?language=${userLocale.languageTag}`,
      );

      return data as PersonCreditResponse;
    },
  });
};

export default useFetchPersonCredits;
