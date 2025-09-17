import React, { FC, Fragment } from "react";
import Text from "../Text";
import { FlatList, FlatListProps, View } from "react-native";
import { Card, CardImage, SubtitleContainer } from "./styles";
import Separator from "../Separator";
import ListFooterComponent from "../ListFooterComponent";
import { BASE_IMAGE_URL } from "@env";
import Loader from "../Loader";
import SkeletonComponent from "../Skeleton";
import { UndefinedProfile } from "~/shared/assets";

// const blurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
    <Fragment>
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
    </Fragment>
  );
};

export default SectionMovieList;
