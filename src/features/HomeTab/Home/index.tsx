import React, { FC, useCallback } from "react";
import { Pressable, ToastAndroid } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Loader,
  RecentlyViewed,
  SectionMovieList,
  Separator,
  Text,
} from "~/shared/components";
import { BASE_IMAGE_URL } from "@env";
import useTranslation from "~/shared/hooks/useTranslate";
import { useSelectMovieDetails } from "~/shared/stores";

import {
  useFetchNowTheaters,
  useFetchRecommendation,
  useFetchTopRated,
  useFetchTrending,
} from "./queries";

import {
  Container,
  RecommendationContainer,
  RecommendationImage,
  SubtitleContainer,
} from "./styles";
import { onlineManager } from "@tanstack/react-query";
import Error from "~/config/routes/Error";

const useLoadData = () => {
  const {
    data: recommendationData,
    isLoading: isLoadingRecommendation,
    error: recommendationError,
    refetch: refetchRecommendation,
  } = useFetchRecommendation();

  const {
    data: trendingData,
    isLoading: isLoadingTrends,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetchTrending();

  const {
    data: topRatedData,
    isLoading: isLoadingTopRated,
    error: topRatedError,
    refetch: refetchTopRated,
  } = useFetchTopRated();

  const {
    data: nowTheatersData,
    isLoading: isLoadingnowTheaters,
    error: nowTheatersError,
    refetch: refetchNowTheaters,
  } = useFetchNowTheaters();

  const error =
    recommendationError || trendingError || topRatedError || nowTheatersError;

  const refetch = () => {
    refetchRecommendation();
    refetchTrending();
    refetchTopRated();
    refetchNowTheaters();
  };

  return {
    recommendationData,
    isLoadingRecommendation,
    trendingData,
    isLoadingTrends,
    topRatedData,
    isLoadingTopRated,
    nowTheatersData,
    isLoadingnowTheaters,
    refetch,
    error,
  };
};

const Home: FC = function () {
  const { getPageTranslations } = useTranslation();
  const translations = getPageTranslations("home") as Translation["home"];

  const movieDetailsStore = useSelectMovieDetails();

  const navigation = useNavigation<NavigationProp<StackParamsList>>();

  const pageData = useLoadData();

  const selectMovie = useCallback(
    (value?: number) => () => {
      if (value) {
        movieDetailsStore.setId(value);
        navigation.navigate("MovieDetails");
      }
    },
    [],
  );

  if (
    pageData.isLoadingRecommendation ||
    pageData.isLoadingTopRated ||
    pageData.isLoadingTrends ||
    pageData.isLoadingnowTheaters
  )
    return <Loader isLoading fullPage />;

  if (pageData.error && !onlineManager.isOnline()) {
    ToastAndroid.show("DEU RUIM", ToastAndroid.LONG);
    return (
      <Error
        error={"networkError"}
        callback={pageData.refetch}
        callbackText="Try Again"
      />
    );
  }

  console.log(
    `aQUI =============== ${BASE_IMAGE_URL}/w500/${pageData.recommendationData?.backdrop_path}`,
  );
  return (
    <Container>
      <SubtitleContainer>
        <Text variant="subtitle">{translations.recomendation}</Text>
        <Separator variant="bold" />
        <Text variant="title">{pageData.recommendationData?.title}</Text>
        <Text>{pageData.recommendationData?.tagline}</Text>
      </SubtitleContainer>
      <RecommendationContainer>
        {pageData.isLoadingRecommendation ? (
          <Loader isLoading size="large" />
        ) : (
          <Pressable
            onPress={selectMovie(pageData.recommendationData?.id)}
            style={{ width: "100%" }}>
            <RecommendationImage
              imageType="backdrop"
              source={`${BASE_IMAGE_URL}/w500/${pageData.recommendationData?.backdrop_path}`}
              contentFit="contain"
            />
            <Text
              variant="sectionTitle"
              style={{ fontSize: 12, alignSelf: "flex-end" }}>
              {translations.recomendationCallToAction}
            </Text>
          </Pressable>
        )}
      </RecommendationContainer>
      <SectionMovieList
        title={translations.trending}
        data={pageData.trendingData}
        isLoading={pageData.isLoadingTrends}
        onSelectMovie={selectMovie}
      />
      <SectionMovieList
        title={translations.nowTheaters}
        data={pageData.nowTheatersData}
        isLoading={pageData.isLoadingnowTheaters}
        onSelectMovie={selectMovie}
      />
      <RecentlyViewed />
      <SectionMovieList
        title={translations.topRated}
        data={pageData.topRatedData}
        isLoading={pageData.isLoadingTopRated}
        onSelectMovie={selectMovie}
      />
    </Container>
  );
};

export default Home;
