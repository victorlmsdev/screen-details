import api from "~/shared/api";

type RequestTokenResponse = {
  request_token: string;
  expires_at: string;
  success: boolean;
};

const createRequestToken = async () => {
  const response = await api.get(`/authentication/token/new`);

  const data = response.data as RequestTokenResponse;

  return data.request_token;
};

export default createRequestToken;
