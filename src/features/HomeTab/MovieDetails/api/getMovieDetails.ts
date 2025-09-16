import api from "~/shared/api";

type MoviewDetailsResponse = MovieDetails & {
  credits: { cast: ActingPerson[]; crew: StaffPerson[] };
};
type Props = {
  id: number;
  languageTag: string;
};

const getMovieDetails = async ({ id, languageTag }: Props) => {
  const response = await api.get<MoviewDetailsResponse>(
    `/movie/${id}?language=${languageTag}&append_to_response=credits`,
  );
  const { data } = response;

  return data;
};

export default getMovieDetails;
