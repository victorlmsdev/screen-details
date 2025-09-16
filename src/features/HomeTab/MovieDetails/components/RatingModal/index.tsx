import { Box, Button, Modal, Row, Text } from "~/shared/components";
import { Slider } from "./styles";
import { FC, useCallback, useEffect, useState } from "react";
import useAddRating from "../../hooks/useAddRating";
import useTranslation from "~/shared/hooks/useTranslate";
import useRemoveRating from "../../hooks/useRemoveRating";
import { Pressable } from "react-native";

type Props = {
  movieId: number;
  userRating?: number;
  visible: boolean;
  onClose: () => void;
};

const RatingModal: FC<Props> = ({ visible, onClose, movieId, userRating }) => {
  const [rating, setRating] = useState(userRating ?? 0);

  const { getPageTranslations } = useTranslation();

  const translations = getPageTranslations(
    "movieDetails",
  ) as Translation["movieDetails"];

  const { mutate: addRatingMutation, isPending, isSuccess } = useAddRating();
  const { mutate: removeRatingMutation, isPending: isPendingRemove } =
    useRemoveRating();

  const handleAddRating = () => {
    addRatingMutation({ movieId, rating });
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const handleReset = useCallback(() => {
    setRating(0);
    removeRatingMutation({ movieId });
  }, []);

  return (
    <Modal {...{ visible, onClose }}>
      <Text variant="title">{translations.ratingModalTitle}</Text>
      <Text variant="body">{translations.ratingModalDesc}</Text>
      <Box width={"100%"} margin={32}>
        <Pressable
          onPress={handleReset}
          disabled={isPendingRemove || isPending}>
          <Text
            variant="body"
            color="link"
            style={{ margin: 8, alignSelf: "flex-end" }}>
            {translations.ratingModalResetLabel}
          </Text>
        </Pressable>
        <Slider
          value={rating}
          onValueChange={setRating}
          step={1}
          minimumValue={0}
          maximumValue={10}
          renderStepNumber
        />
      </Box>

      <Row justifyContent="space-between" alignItems="center" width={"100%"}>
        <Button
          width={"45%"}
          disabled={isPendingRemove || isPending}
          loading={isPendingRemove || isPending}
          onPress={onClose}>
          <Text variant="subtitle">{translations.ratingModalCancelBt}</Text>
        </Button>
        <Button
          width={"45%"}
          disabled={isPendingRemove || isPending}
          loading={isPendingRemove || isPending}>
          <Text variant="subtitle" onPress={handleAddRating}>
            {translations.ratingModalConfirmBt}
          </Text>
        </Button>
      </Row>
    </Modal>
  );
};

export default RatingModal;
