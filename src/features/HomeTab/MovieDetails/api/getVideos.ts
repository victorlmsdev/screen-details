import api from "~/shared/api";

type Props = {
  id: number;
  languageTag: string;
};

const getVideos = async ({ id, languageTag }: Props) => {
  const { data } = await api.get(`/movie/${id}/videos?language=${languageTag}`);

  return data;
};

export default getVideos;
