import { useMutation } from "@tanstack/react-query";
import useSecureStore from "~/shared/stores/useSecureStore";
import useUserStore from "~/shared/stores/useUserStore";
import getUserAccountId from "../../api/getUserAccountId";
import getUserDetails from "../../api/getUserDetails";

const useGetUserDetails = () => {
  const { getValue, keys } = useSecureStore();
  const { setUser, user } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["getUserDetails"],
    mutationFn: async () => {
      const sessionId = await getValue(keys.SESSION_ID);
      if (!sessionId) return;

      const accountId = await getUserAccountId(sessionId);

      if (!accountId) return;

      const accountDetails = await getUserDetails(accountId);

      setUser(accountDetails);
    },
  });

  return { user, ...mutation };
};

export default useGetUserDetails;
