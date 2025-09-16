import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureStore from "~/shared/stores/useSecureStore";
import getUserAccountId from "../../api/getUserAccountId";
import getUserDetails from "../../api/getUserDetails";
import useUserStore from "~/shared/stores/useUserStore";
import deleteSession from "../../api/deleteSession";
import { ToastAndroid } from "react-native";
import { getAccountStatesQueryId } from "~/features/HomeTab/MovieDetails/hooks/useGetAccountStates";
import { getRatedMoviesQueryId } from "../useGetRatedMovies";

const useDeleteSession = () => {
  const queryClient = useQueryClient();

  const { getValue, deleteValue, keys } = useSecureStore();
  const { reset: resetUser } = useUserStore();
  return useMutation({
    mutationKey: ["getUserDetails"],
    mutationFn: async () => {
      try {
        const sessionId = await getValue(keys.SESSION_ID);

        if (!sessionId) return null;
      } catch (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      } finally {
        await deleteValue(keys.SESSION_ID);

        resetUser();
        queryClient.invalidateQueries({
          predicate: query => {
            return [getAccountStatesQueryId, getRatedMoviesQueryId].includes(
              `${query.queryKey[0]}`,
            );
          },
        });
      }
    },
  });
};

export default useDeleteSession;
