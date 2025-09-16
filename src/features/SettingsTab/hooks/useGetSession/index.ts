import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Linking, ToastAndroid } from "react-native";
import useSecureStore from "~/shared/stores/useSecureStore";
import createRequestToken from "../../api/createRequestToken";
import createSession from "../../api/createSession";
import useTranslation from "~/shared/hooks/useTranslate";
import getUserAccountId from "../../api/getUserAccountId";
import useGetUserDetails from "../useGetUserDetails";
import { getAccountStatesQueryId } from "~/features/HomeTab/MovieDetails/hooks/useGetAccountStates";
import { getRatedMoviesQueryId } from "../useGetRatedMovies";
import { useEffect } from "react";

const useGetSession = () => {
  const queryClient = useQueryClient();

  const { getPageTranslations } = useTranslation();
  const translations = getPageTranslations("shared") as Translation["shared"];

  const secureStore = useSecureStore();

  const { save, getValue, keys } = secureStore;

  const { mutate: getUserDetailsMutation, isSuccess: isUserDetailsSuccess } =
    useGetUserDetails();

  useEffect(() => {
    queryClient.invalidateQueries({
      predicate: query => {
        return [getAccountStatesQueryId, getRatedMoviesQueryId].includes(
          `${query.queryKey[0]}`,
        );
      },
    });
  }, [isUserDetailsSuccess]);

  const authenticationCallback = async ({
    url,
    requestToken,
  }: {
    url: string;
    requestToken: string;
  }) => {
    if (url.startsWith("screendetails://auth-callback")) {
      const sessionId = await createSession(requestToken);

      if (sessionId) {
        await save(keys.SESSION_ID, sessionId);
        getUserDetailsMutation();
      } else {
        ToastAndroid.show(translations.genericError, ToastAndroid.LONG);
      }
    }
  };

  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: async () => {
      try {
        const storedSessionId = await getValue(keys.SESSION_ID);

        if (storedSessionId) {
          const accountId = await getUserAccountId(storedSessionId);
          if (accountId) {
            return;
          }
        }

        const requestToken = await createRequestToken();

        Linking.addEventListener("url", ({ url }) =>
          authenticationCallback({ url, requestToken }),
        );

        const authenticationUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=screendetails://auth-callback`;

        await Linking.openURL(authenticationUrl);
      } catch (error) {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG);
        throw error;
      }
    },
  });
};

export default useGetSession;
