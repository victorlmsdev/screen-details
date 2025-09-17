import api from "~/shared/api";

const getUserAccountId = async (sessionId: string) => {
  const { data } = await api.get(`/account/account_id?session_id=${sessionId}`);

  return data;
};

export default getUserAccountId;
