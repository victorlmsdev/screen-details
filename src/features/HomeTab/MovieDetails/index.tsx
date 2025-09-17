import { BASE_IMAGE_URL } from "@env";
import React, { useCallback, useEffect, useMemo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import {
  Column,
  LabeledValueList as CrewList,
  If,
  Loader,
  Row,
  SectionActingPersonList,
  SectionContainer,
  SectionMovieList,
  Separator,
  Text,
} from "~/shared/components";
import Box from "~/shared/components/Box";
import useTranslation from "~/shared/hooks/useTranslate";
import { useLocaleStore, useRecentlyViewedStore } from "~/shared/stores";
import useSelectMovieDetails from "~/shared/stores/useSelectMovieDetails";
import useSelectPersonDetails from "~/shared/stores/useSelectPersonDetails";
import { UsersRating } from "./components";
import GenresList from "./components/GenresList";
import ProvidersList from "./components/ProvidersList";
import useFetchRecommendations from "./hooks/useGetRecommendations";
import useFetchVideos from "./hooks/useGetVideos";
import useFetchMovieDetails from "./hooks/useGetMovieDetails";
import { BackDropImage, Container } from "./styles";
import useGetAccountStates from "./hooks/useGetAccountStates";

const MovieDetails: React.FC = function () {
  const navigation = useNavigation<NavigationProp<StackParamsList>>();
  const movieStore = useSelectMovieDetails();
  const personStore = useSelectPersonDetails();
  const { userLocale } = useLocaleStore();

  const { addMovie } = useRecentlyViewedStore();

  const { getPageTranslations } = useTranslation();
  const translations = getPageTranslations(
    "movieDetails",
  ) as Translation["movieDetails"];

  const {
    data: movie,
    error,
    isPending,
    isSuccess,
  } = useFetchMovieDetails(movieStore.id);
  const { data: recommendations, isPending: isPendingRecommendations } =
    useFetchRecommendations(movieStore.id);
  const { data: videos, isPending: isPendingVideos } = useFetchVideos(
    movieStore.id,
  );

  const { data: accountStates } = useGetAccountStates(movieStore.id);

  useEffect(() => {
    if (error) {
      ToastAndroid.show("Erro ao buscar filme", ToastAndroid.LONG);
      navigation.goBack();
      movieStore.reset();
    }
  }, [error]);
  useEffect(() => {
    if (isSuccess)
      addMovie({
        id: movie!.id,
        title: movie!.title,
        poster_path: movie!.poster_path,
      });
  }, [isSuccess]);

  const getMoneyValue = useCallback((value: number) => {
    if (value === 0) return "-";
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const releaseDate = useMemo(
    () =>
      movie?.release_date
        ? new Date(movie.release_date).toLocaleDateString(
            userLocale.languageTag,
          )
        : "",
    [movie],
  );

  const directors = useMemo(() => {
    const aux = movie?.credits?.crew?.filter(c => c.job === "Director") ?? [];
    return aux?.map(item => ({
      label: item.name,
      value: item.known_for_department,
      id: item.id,
    }));
  }, [movie]);

  const writers = useMemo(() => {
    const aux = movie?.credits?.crew?.filter(c => c.job === "Writer") ?? [];

    return aux?.map(item => ({
      label: item.name,
      value: item.known_for_department,
      id: item.id,
    }));
  }, [movie]);

  const handleSelectPerson = useCallback(
    (id: number) => () => {
      personStore.setId(id);
      navigation.navigate("PersonDetails");
    },
    [],
  );

  if (isPending) return <Loader fullPage isLoading />;

  if (!movie) {
    navigation.goBack();
    movieStore.reset();
    ToastAndroid.show("An error ocurred", ToastAndroid.LONG);
    navigation.goBack();
    return null;
  }

  return (
    <Container>
      <SectionContainer>
        <Separator variant="bold" />
        <Text variant="megaTitle">{movie.title}</Text>
        <Text variant="body">{movie.tagline}</Text>
        <Text variant="body">
          {releaseDate} | {Math.floor(movie.runtime / 60)}h{movie.runtime % 60}
          min
        </Text>
        <BackDropImage
          imageType="backdrop"
          source={`${BASE_IMAGE_URL}/w500/${movie.backdrop_path}`}
          contentFit="contain"
          transition={150}
        />
      </SectionContainer>
      <GenresList genres={movie.genres} />
      <SectionContainer>
        <Text style={{ textAlign: "justify" }}>{movie.overview}</Text>
      </SectionContainer>
      <If conditional={movie.credits.cast.length > 0}>
        <SectionActingPersonList
          isLoading={isPending}
          data={movie.credits.cast}
          title={translations.cast}
          onPress={(value: number) => handleSelectPerson(value)}
        />
      </If>
      <If conditional={movie.credits.crew.length > 0}>
        <SectionContainer>
          <Text variant="subtitle">{translations.crew}</Text>
          <Separator />
        </SectionContainer>
        <CrewList
          data={[...directors, ...writers]}
          onPress={handleSelectPerson}
        />
      </If>
      <SectionContainer>
        <UsersRating
          movieId={movie.id}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          userRating={accountStates?.rated?.value}
          signedIn={accountStates?.signedIn}
        />
        <Text variant="caption" style={{ marginBottom: 16 }}>
          {`${movie.vote_count} ${translations.votes}`}
        </Text>
      </SectionContainer>

      <SectionContainer>
        <Separator variant="styled" />
        <Row
          width={"100%"}
          margin={"0px 0px 16px 0px"}
          justifyContent="space-around">
          <Column alignItems="center">
            <Text variant="megaTitle">{translations.budget}</Text>
            <Text style={{ fontSize: 20 }}>{getMoneyValue(movie.budget)}</Text>
          </Column>
          <Column alignItems="center">
            <Text variant="megaTitle">{translations.revenue}</Text>
            <Text style={{ fontSize: 20 }}>{getMoneyValue(movie.revenue)}</Text>
          </Column>
        </Row>
      </SectionContainer>
      <ProvidersList />
      <If
        conditional={
          !isPendingRecommendations &&
          !!recommendations &&
          recommendations?.length > 0
        }>
        <SectionMovieList
          title={translations.similarMovies}
          data={recommendations}
          isLoading={isPendingRecommendations}
          onSelectMovie={id => () => movieStore.setId(id)}
        />
      </If>
      <If conditional={!isPendingVideos && !!videos && videos.length > 0}>
        <SectionContainer>
          <Text variant="subtitle">{translations.trailer}</Text>
          <Separator />
          <Box margin={"16px 0px"}>
            <YoutubeIframe
              height={190}
              videoId={
                videos?.find(v => v.type === "Trailer" && v.site === "YouTube")
                  ?.key
              }
            />
          </Box>
        </SectionContainer>
      </If>
    </Container>
  );
};

export default MovieDetails;
