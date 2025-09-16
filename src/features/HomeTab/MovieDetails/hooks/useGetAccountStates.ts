import { useQuery } from "@tanstack/react-query";
import getAccountStates from "../api/getAccountStates";
import useUserStore from "~/shared/stores/useUserStore";

export const getAccountStatesQueryId = "GET_ACCOUNT_STATES";

const useGetAccountStates = (id: number) => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: [getAccountStatesQueryId, id],
    queryFn: async () => {
      const data = await getAccountStates({
        id,
      });

      if (!data) throw new Error("Couldn't find any videos");

      return { ...data, signedIn: !!user?.id };
    },
  });
};

export default useGetAccountStates;
