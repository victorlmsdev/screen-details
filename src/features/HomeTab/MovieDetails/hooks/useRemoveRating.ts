import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureStore from "~/shared/stores/useSecureStore";
import removeRating from "../api/removeRating";
import { getAccountStatesQueryId } from "./useGetAccountStates";
import { getRatedMoviesQueryId } from "~/features/SettingsTab/hooks/useGetRatedMovies";

const queryId = "REMOVE_RATING";

const useRemoveRating = () => {
  const queryClient = useQueryClient();
  const { getValue, keys } = useSecureStore();

  return useMutation({
    mutationKey: [queryId],
    mutationFn: async ({ movieId }: { movieId: number }) => {
      const sessionId = await getValue(keys.SESSION_ID);

      if (!sessionId) throw new Error("No session id found");

      const result = await removeRating({ movieId, sessionId });
      if (!result) throw "Error removing rating";

      queryClient.invalidateQueries({
        predicate: query => {
          return [getAccountStatesQueryId, getRatedMoviesQueryId].includes(
            `${query.queryKey[0]}`,
          );
        },
      });
    },
  });
};

export default useRemoveRating;
