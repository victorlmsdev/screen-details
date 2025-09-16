import { BASE_URL } from "@env";
import api from "~/shared/api";

type RequestTokenResponse = {
  request_token: string;
  expires_at: string;
  success: boolean;
};

const getUserAccountId = async (sessionId: string) => {
  const { data } = await api.get(
    `${BASE_URL}/account/account_id?session_id=${sessionId}`,
  );

  return data;
};

export default getUserAccountId;
