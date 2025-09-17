import api from "~/shared/api";

const getUserDetails = async (accountId: number) => {
  const { data } = await api.get(`/account/${accountId}`);

  return data;
};

export default getUserDetails;
