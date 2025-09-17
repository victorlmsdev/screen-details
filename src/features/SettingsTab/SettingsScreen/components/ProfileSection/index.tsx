import { Fragment, useCallback, useState } from "react";
import {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import useGetSession from "~/features/SettingsTab/hooks/useGetSession";
import { Box, Button, Text } from "~/shared/components";
import useTranslation from "~/shared/hooks/useTranslate";
import useUserStore from "~/shared/stores/useUserStore";
import Avatar from "../Avatar";
import SignoutModal from "../SignoutModal";

const ProfileSection = function () {
  const [openSignoutModal, setOpenSignoutModal] = useState(false);

  const { getPageTranslations } = useTranslation();

  const { mutate, isPending } = useGetSession();

  const { user } = useUserStore();

  const translations = getPageTranslations("profile") as Translation["profile"];

  const sharedTranslations = getPageTranslations(
    "shared",
  ) as Translation["shared"];

  const toggleModal = useCallback(() => setOpenSignoutModal(prev => !prev), []);

  return (
    <Box
      flexDirection={user ? "row" : "column"}
      alignItems="center"
      width={"100%"}>
      <Avatar imageUrl={user?.avatar?.tmdb?.avatar_path ?? undefined} />
      {!user && (
        <Box entering={FadeInDown} exiting={FadeOutLeft}>
          <Button onPress={() => mutate()} disabled={isPending}>
            {isPending
              ? sharedTranslations.loading
              : translations.signInButtonLabel}
          </Button>
        </Box>
      )}
      {user && (
        <Box
          flexDirection="column"
          margin={8}
          entering={FadeInLeft}
          exiting={FadeOutRight}>
          <Text variant="caption">{translations.tmdbUser}</Text>
          <Text variant="title">{user?.username}</Text>
          {user?.name && (
            <Fragment>
              <Text variant="caption">{translations.name}</Text>
              <Text variant="title">{user?.name}</Text>
            </Fragment>
          )}
          <Text variant="body" color="link" onPress={toggleModal}>
            {translations.signOutCTA}
          </Text>
        </Box>
      )}
      <SignoutModal visible={openSignoutModal} onClose={toggleModal} />
    </Box>
  );
};

export default ProfileSection;
