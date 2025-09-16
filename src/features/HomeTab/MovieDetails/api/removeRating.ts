import api from "~/shared/api";

type RemoveRatingRequestProps = {
  movieId: number;
  sessionId: string;
};

const removeRating = async ({
  movieId,
  sessionId,
}: RemoveRatingRequestProps) => {
  const response = await api.delete(
    `/movie/${movieId}/rating?session_id=${sessionId}`,
  );
  return response.status;
};

export default removeRating;
