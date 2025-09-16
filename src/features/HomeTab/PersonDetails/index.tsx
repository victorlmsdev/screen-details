import { BASE_IMAGE_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { UndefinedProfile } from "~/shared/assets";
import {
  Column,
  If,
  LabeledValueList,
  Loader,
  Row,
  SectionContainer,
  SectionMovieList,
  Separator,
  Text,
} from "~/shared/components";
import { Gender } from "~/shared/enums";
import useSelectMovieDetails from "~/shared/stores/useSelectMovieDetails";
import useSelectPersonDetails from "~/shared/stores/useSelectPersonDetails";
import useFetchPersonCredits from "./queries/useFetchPersonCredits";
import useFetchPersonDetails from "./queries/useFetchPersonDetails";
import { Container, ProfileImage } from "./styles";
import useTranslation from "~/shared/hooks/useTranslate";

const PersonDetails: FC = function () {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const { getPageTranslations } = useTranslation();
  const translation = getPageTranslations(
    "personDetails",
  ) as Translation["personDetails"];

  const [showFullBiography, toggleShowFullBiography] = useState(false);
  const [profileSource, setProfileSource] = useState(UndefinedProfile);

  const id = useSelectPersonDetails(state => state.id);
  const { data: person, isPending: isPersonPending } =
    useFetchPersonDetails(id);
  const { data: personCredits, isPending: isPersonCreditsPending } =
    useFetchPersonCredits(id);

  useEffect(() => {
    if (person?.profile_path) {
      const auxSource = `${BASE_IMAGE_URL}original/${person?.profile_path}`;
      setProfileSource(auxSource);
    }
  }, [person]);

  const movieStore = useSelectMovieDetails();
  const renderPersonInfo = useCallback(
    (label: string, value?: string | null) => {
      if (!value) return null;
      return (
        <Fragment>
          <Text variant="sectionTitle">{label}</Text>
          <Text variant="body">{value}</Text>
        </Fragment>
      );
    },
    [],
  );

  const renderBiography = useCallback(() => {
    const biography = showFullBiography
      ? person?.biography
      : person?.biography.slice(0, 140);

    const actionLabel = showFullBiography
      ? translation.hideFullBiographyButtonLabel
      : translation.showFullBiographyButtonLabel;

    return (
      <If conditional={!!biography && biography?.length > 0}>
        <Text variant="subtitle">{translation.biographyTitle}</Text>
        <Separator variant="regular" />
        <Text>
          {biography}
          <Pressable onPress={() => toggleShowFullBiography(prev => !prev)}>
            <Text variant="sectionTitle">{actionLabel}</Text>
          </Pressable>
        </Text>
      </If>
    );
  }, [showFullBiography, person]);

  const handleSelectMovie = useCallback(
    (id: number) => () => {
      movieStore.reset();
      movieStore.setId(id);
      navigation.navigate("MovieDetails");
    },
    [],
  );

  if (isPersonPending) return <Loader fullPage isLoading />;

  if (!person) return null;

  return (
    <Container>
      <SectionContainer>
        <Separator variant="bold" />
        <Text variant="megaTitle">{person?.name}</Text>
        <Row>
          <Column width={"50%"}>
            <ProfileImage
              source={profileSource}
              contentFit="contain"
              transition={150}
            />
          </Column>
          <Column width={"50%"}>
            {renderPersonInfo(
              translation.gender,
              Gender[person.gender as keyof typeof Gender],
            )}
            {renderPersonInfo(translation.birthday, person.birthday)}
            {renderPersonInfo(translation.deathday, person?.deathday)}
            {renderPersonInfo(
              translation.knownFor,
              person.known_for_department,
            )}
            {renderPersonInfo(translation.origin, person.place_of_birth)}
            {renderPersonInfo(
              translation.knownCredits,
              String(
                (personCredits?.cast?.length ?? 0) +
                  (personCredits?.crew?.length ?? 0),
              ),
            )}
          </Column>
        </Row>
        {renderBiography()}
      </SectionContainer>
      <If conditional={!!personCredits?.cast && personCredits?.cast.length > 0}>
        <SectionMovieList
          title={translation.cast}
          data={personCredits?.cast}
          isLoading={isPersonCreditsPending}
          onSelectMovie={handleSelectMovie}
        />
      </If>

      <If conditional={!!personCredits?.crew && personCredits?.crew.length > 0}>
        <SectionMovieList
          title={translation.crew}
          data={personCredits?.crew}
          isLoading={isPersonCreditsPending}
          onSelectMovie={handleSelectMovie}
        />
      </If>
      <If conditional={person?.also_known_as.length > 0}>
        <SectionContainer>
          <Text variant="subtitle">{translation.alsoKnownAs}</Text>
          <Separator />
        </SectionContainer>
        <LabeledValueList
          data={
            person?.also_known_as?.map((item, index) => ({
              id: index,
              label: item,
            })) ?? []
          }
        />
      </If>
    </Container>
  );
};

export default PersonDetails;
