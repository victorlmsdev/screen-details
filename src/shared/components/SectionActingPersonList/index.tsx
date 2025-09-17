import { BASE_IMAGE_URL } from "@env";
import React, { FC } from "react";
import { FlatList, FlatListProps } from "react-native";
import { FadeInLeft } from "react-native-reanimated";
import Box from "../Box";
import ListFooterComponent from "../ListFooterComponent";
import Separator from "../Separator";
import SkeletonComponent from "../Skeleton";
import Text from "../Text";
import { CardContainer, CardImage, SubtitleContainer } from "./styles";
import { UndefinedProfile } from "~/shared/assets";

type Props = {
  data?: ActingPerson[];
  isLoading: boolean;
  title: string;
  onPress: (id: number) => () => void;
  flatListProps?: Omit<FlatListProps<ActingPerson>, "data" | "renderItem">;
};

const SectionActingPersonList: FC<Props> = function ({
  data,
  title,
  isLoading,
  onPress,
  flatListProps,
}) {
  return (
    <Box entering={FadeInLeft} key={`section-person-list:${title}`}>
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
          keyExtractor={(item, index) => `cast:${item.id}:${index}`}
          renderItem={({ item }) => {
            return (
              <CardContainer onPress={onPress(item.id)}>
                <CardImage
                  source={`${BASE_IMAGE_URL}/w92/` + item.profile_path}
                  contentFit="contain"
                  placeholder={UndefinedProfile}
                  transition={250}
                />
                <Text variant="sectionTitle" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text variant="body" numberOfLines={1}>
                  {item.character}
                </Text>
              </CardContainer>
            );
          }}
          ListFooterComponent={() => <ListFooterComponent />}
        />
      </SkeletonComponent>
    </Box>
  );
};

export default SectionActingPersonList;
