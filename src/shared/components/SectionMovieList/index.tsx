import { BASE_IMAGE_URL } from "@env";
import React, { FC } from "react";
import { FlatList, FlatListProps } from "react-native";
import { FadeInLeft } from "react-native-reanimated";
import { UndefinedProfile } from "~/shared/assets";
import Box from "../Box";
import ListFooterComponent from "../ListFooterComponent";
import Separator from "../Separator";
import SkeletonComponent from "../Skeleton";
import Text from "../Text";
import { Card, CardImage, SubtitleContainer } from "./styles";

type Props = {
  data?: MovieCard[];
  isLoading: boolean;
  title: string;
  onSelectMovie: (id: number) => () => void;
  flatListProps?: Omit<FlatListProps<MovieCard>, "data" | "renderItem">;
};

const SectionMovieList: FC<Props> = function ({
  data,
  title,
  isLoading,
  onSelectMovie,
  flatListProps,
}) {
  return (
    <Box entering={FadeInLeft} key={`section-movie-list:${title}`}>
      <SubtitleContainer>
        <Text variant="subtitle">{title}</Text>
        <Separator variant="regular" />
      </SubtitleContainer>

      <SkeletonComponent show={isLoading}>
        <FlatList
          {...{ flatListProps }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data ?? []}
          keyExtractor={(item, index) => `${title}:${item.id}:${index}`}
          renderItem={({ item }) => {
            return (
              <Card onPress={onSelectMovie(item.id)}>
                <CardImage
                  source={`${BASE_IMAGE_URL}/w92/` + item.poster_path}
                  contentFit="contain"
                  transition={1000}
                  placeholder={UndefinedProfile}
                />
                <Text variant="sectionTitle" numberOfLines={2}>
                  {item.title}
                </Text>
              </Card>
            );
          }}
          ListFooterComponent={() => <ListFooterComponent />}
        />
      </SkeletonComponent>
    </Box>
  );
};

export default SectionMovieList;
