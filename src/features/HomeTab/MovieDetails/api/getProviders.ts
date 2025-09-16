import api from "~/shared/api";

type Props = {
  id: number;
};

const getProviders = async ({ id }: Props) => {
  const { data } = await api.get(`/movie/${id}/watch/providers`);

  return data;
};

export default getProviders;
