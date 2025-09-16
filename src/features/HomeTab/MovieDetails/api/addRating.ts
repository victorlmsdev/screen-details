import api from "~/shared/api";

export type RatingRequestProps = {
  movieId: number;
  rating: number;
  sessionId: string;
};

const addRating = async ({
  movieId,
  rating,
  sessionId,
}: RatingRequestProps) => {
  const { data } = await api.post(
    `/movie/${movieId}/rating?session_id=${sessionId}`,
    {
      value: rating,
    },
  );

  return data;
};

export default addRating;
