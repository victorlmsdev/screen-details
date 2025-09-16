import React, { FC, useMemo, useState } from "react";
import {
  ListFooterComponent,
  If,
  Separator,
  Text,
  SectionContainer,
} from "~/shared/components";
import useFetchProviders from "../../hooks/useGetProviders";
import useSelectMovieDetails from "~/shared/stores/useSelectMovieDetails";
import { FlatList } from "react-native";
import { CardContainer, CardImage } from "./styles";
import { BASE_IMAGE_URL } from "@env";
import useTranslation from "~/shared/hooks/useTranslate";
import SkeletonComponent from "~/shared/components/Skeleton";

const ProvidersList: FC = function () {
  const { getPageTranslations } = useTranslation();
  const translations = getPageTranslations(
    "movieDetails",
  ) as Translation["movieDetails"];

  const movieId = useSelectMovieDetails(state => state.id);

  const { data: providers, isPending: isProvidersPending } =
    useFetchProviders(movieId);

  const flatrateArr = useMemo(
    () =>
      providers?.flatrate?.map(item => ({
        ...item,
        typeLabel: "Streaming",
      })) ?? [],
    [providers],
  );

  const rentArr = useMemo(
    () => providers?.rent?.map(item => ({ ...item, typeLabel: "Rent" })) ?? [],
    [providers],
  );

  const buyArr = useMemo(
    () => providers?.buy?.map(item => ({ ...item, typeLabel: "Buy" })) ?? [],
    [providers],
  );

  return (
    <If conditional={!!providers}>
      <SectionContainer>
        <Text variant="subtitle">{translations.whereToWatch}</Text>
        <Separator variant="regular" />
      </SectionContainer>
      <SkeletonComponent show={isProvidersPending}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...flatrateArr, ...rentArr, ...buyArr]}
          keyExtractor={(item, index) =>
            `${index}:${item.provider_id}-${item.typeLabel}`
          }
          ListFooterComponent={() => <ListFooterComponent />}
          renderItem={({ item }) => {
            return (
              <CardContainer>
                <CardImage
                  source={`${BASE_IMAGE_URL}w500/${item?.logo_path}`}
                  placeholder={item?.provider_name}
                  contentFit="contain"
                  transition={350}
                />
                <Text variant="caption">{item.typeLabel}</Text>
              </CardContainer>
            );
          }}
        />
      </SkeletonComponent>
    </If>
  );
};

export default ProvidersList;
