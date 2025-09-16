import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";
import useSecureStore from "~/shared/stores/useSecureStore";
import addRating, { RatingRequestProps } from "../api/addRating";
import { getAccountStatesQueryId } from "./useGetAccountStates";
import { getRatedMoviesQueryId } from "~/features/SettingsTab/hooks/useGetRatedMovies";

const queryId = "ADD_RATING";

const useAddRating = () => {
  const queryClient = useQueryClient();
  const { getValue, keys } = useSecureStore();

  return useMutation({
    mutationKey: [queryId],
    mutationFn: async ({
      movieId,
      rating,
    }: Omit<RatingRequestProps, "sessionId">) => {
      try {
        const sessionId = await getValue(keys.SESSION_ID);

        if (!sessionId) throw new Error("No session id found");

        const result = await addRating({ movieId, rating, sessionId });
        if (!result.success) throw "Error adding rating";

        queryClient.invalidateQueries({
          predicate: query => {
            return [getAccountStatesQueryId, getRatedMoviesQueryId].includes(
              `${query.queryKey[0]}`,
            );
          },
        });
      } catch (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      }
    },
  });
};

export default useAddRating;
