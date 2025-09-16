import React, { FC, Fragment, useMemo, useState } from "react";
import { Box, Button, If, Row, Text } from "~/shared/components";
import useTranslation from "~/shared/hooks/useTranslate";
import RatingModal from "../RatingModal";
import { Container, Content, Icon, ProgressBar } from "./styles";

type Props = {
  voteAverage: number;
  voteCount: number;
  movieId: number;
  userRating?: number;
  signedIn: boolean;
};

const UsersRating: FC<Props> = function ({
  voteAverage,
  voteCount,
  movieId,
  userRating,
  signedIn,
}) {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const { getPageTranslations } = useTranslation();

  const translations = getPageTranslations(
    "movieDetails",
  ) as Translation["movieDetails"];

  const [buttonLabel, iconName] = useMemo(() => {
    let label = "";
    let icon = "thumbs-up-down";

    if (userRating) {
      label = `${translations.changeRatingCTA} ${userRating * 10}%`;
      if (userRating >= 6) icon = "thumb-up";
      else icon = "thumb-down";
    } else {
      label = translations.ratingCTA;
    }

    return [label, icon];
  }, [userRating]);

  return (
    <Fragment>
      <Row justifyContent="flex-start" alignItems="center" width={"100%"}>
        <Box width="30%">
          <Container>
            <If
              conditional={voteCount > 0}
              elseRender={<Text variant="title">{translations.noRating}</Text>}>
              <Content>
                <Text variant="megaTitle">{Math.round(voteAverage * 10)}%</Text>
              </Content>
              <Content>
                <Text>{translations.usersRating}</Text>
              </Content>
            </If>
          </Container>
          <ProgressBar progress={voteAverage / 10} />
        </Box>
        <If conditional={signedIn}>
          <Icon name={iconName} size={40} />
          <Button onPress={() => setIsRatingModalOpen(true)}>
            <Text variant="subtitle">{buttonLabel}</Text>
          </Button>
        </If>
      </Row>
      <RatingModal
        userRating={userRating}
        movieId={movieId}
        visible={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />
    </Fragment>
  );
};

export default UsersRating;
