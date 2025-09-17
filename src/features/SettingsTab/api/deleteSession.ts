import api from "~/shared/api";

type DeleteSessionResponse = {
  success: boolean;
};

const deleteSession = async (sessionId: string) => {
  const response = await api.delete(`/authentication/session/`, {
    data: { session_id: sessionId },
  });

  const data = response.data as DeleteSessionResponse;

  return data.success;
};

export default deleteSession;
