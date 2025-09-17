import { API_KEY } from "@env";
import api from "~/shared/api";

type RequestTokenResponse = {
  session_id: string;
  success: boolean;
};

const createSession = async (requestToken: string) => {
  const response = await api.post(
    `/authentication/session/new?api_key=${API_KEY}`,
    {
      request_token: requestToken,
    },
  );

  const data = response.data as RequestTokenResponse;

  return data.session_id;
};

export default createSession;
