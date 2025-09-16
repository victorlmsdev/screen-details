import { BASE_URL } from "@env";
import api from "~/shared/api";

type Props = {
  accountId: number;
  language: string;
  page: number;
};

const getRatedMovies = async ({ accountId, language, page }: Props) => {
  const response = await api.get(
    `${BASE_URL}/account/${accountId}/rated/movies?language=${language}&page=${page}&sort_by=created_at.desc`,
  );

  return response.data;
};

export default getRatedMovies;
