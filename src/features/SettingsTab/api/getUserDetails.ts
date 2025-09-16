import { BASE_URL } from "@env";
import api from "~/shared/api";

const getUserDetails = async (accountId: number) => {
  const { data } = await api.get(`${BASE_URL}/account/${accountId}`);

  return data;
};

export default getUserDetails;
