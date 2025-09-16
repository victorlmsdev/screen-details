import * as Clipboard from "expo-clipboard";
import React, { useCallback } from "react";
import { Linking, Pressable } from "react-native";
import {
  RecentlyViewed,
  SectionContainer,
  Separator,
  Text,
} from "~/shared/components";

import TMDBLogo from "~/shared/components/TMDBLogo";
import useTranslation from "~/shared/hooks/useTranslate";
import PackageJson from "../../../../package.json";
import { ProfileSection } from "./components";
import RatedMovies from "./components/RatedMovies";
import { Container } from "./styles";

const Settings = function () {
  const { getPageTranslations } = useTranslation();

  const translation = getPageTranslations(
    "settings",
  ) as Translation["settings"];

  const handleLink = useCallback((url: string, navigate: boolean) => {
    Clipboard.setStringAsync(url);
    if (navigate) {
      Linking.openURL(url);
    }
  }, []);

  return (
    <Container>
      <SectionContainer style={{ marginTop: 16 }}>
        <ProfileSection />
      </SectionContainer>
      <RatedMovies />
      <RecentlyViewed />
      <SectionContainer>
        <Text variant="megaTitle">{translation.informationTitle}</Text>
        <Text>{translation.description1}</Text>
        <Separator style={{ marginVertical: 8 }} />

        <Text variant="subtitle">{translation.dataSourceTitle}</Text>
        <Pressable
          onPress={() => handleLink("https://www.themoviedb.org/", true)}>
          <Text color="link">{translation.dataSource}</Text>
          <Text variant="caption">{translation.dataSourceDescription}</Text>
          <TMDBLogo width={"45%"} height={50} />
        </Pressable>

        <Text variant="title">{translation.developerLabel}</Text>
        <Separator />
        <Pressable
          onPress={() =>
            handleLink("https://www.linkedin.com/in/victorlimams/", true)
          }>
          <Text color="link">{translation.developerName}</Text>
        </Pressable>
        <Text variant="caption" style={{ marginTop: 16 }}>
          {translation.versionLabel} {PackageJson.version}
        </Text>
        <Text>{translation.thanks}</Text>
      </SectionContainer>
    </Container>
  );
};

export default Settings;
