import api from "~/shared/api";

type Props = {
  id: number;
  page: number;
  languageTag: string;
};

const getRecommendations = async ({ id, page, languageTag }: Props) => {
  const { data } = await api.get(
    `/movie/${id}/recommendations?language=${languageTag}&page=${page}`,
  );

  const results = data?.results;

  if (!results) throw new Error("No recommendations found");

  return results;
};

export default getRecommendations;
