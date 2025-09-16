import api from "~/shared/api";

type Props = {
  id: number;
};

type AccountStates = {
  favorite: boolean;
  rated?: { value: number };
  watchlist: boolean;
};

const getAccountStates = async ({ id }: Props) => {
  const { data } = await api.get(`/movie/${id}/account_states`);

  return data as AccountStates;
};

export default getAccountStates;
