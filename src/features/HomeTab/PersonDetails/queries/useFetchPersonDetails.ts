import { useQuery } from "@tanstack/react-query";
import api from "~/shared/api";
import { useLocaleStore } from "~/shared/stores";

const queryId = "FETCH_PERSON_DETAILS";

const useFetchPersonDetails = (id: number) => {
  const { userLocale } = useLocaleStore();
  return useQuery({
    queryKey: [queryId, id],
    queryFn: async () => {
      const { data } = await api.get(
        `/person/${id}?language=${userLocale.languageTag}`,
      );

      return data as Person;
    },
  });
};

export default useFetchPersonDetails;
