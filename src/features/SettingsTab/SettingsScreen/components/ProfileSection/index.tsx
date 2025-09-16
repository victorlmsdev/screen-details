import { Fragment, useCallback, useState } from "react";
import useGetSession from "~/features/SettingsTab/hooks/useGetSession";
import { Button, Text } from "~/shared/components";
import { View } from "~/shared/components/Box/styles";
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

  const closeSignoutModal = useCallback(() => setOpenSignoutModal(false), []);

  return (
    <View flexDirection={user ? "row" : "column"} alignItems="center">
      <Avatar imageUrl={user?.avatar?.tmdb?.avatar_path ?? undefined} />
      {!user && (
        <Button onPress={() => mutate()} disabled={isPending}>
          {isPending
            ? sharedTranslations.loading
            : translations.signInButtonLabel}
        </Button>
      )}
      {user && (
        <View flexDirection="column" margin={8}>
          <Text variant="caption">{translations.tmdbUser}</Text>
          <Text variant="title">{user?.username}</Text>
          {user?.name && (
            <Fragment>
              <Text variant="caption">{translations.name}</Text>
              <Text variant="title">{user?.name}</Text>
            </Fragment>
          )}
          <Text
            variant="body"
            color="link"
            onPress={() => setOpenSignoutModal(true)}>
            {translations.signOutCTA}
          </Text>
        </View>
      )}
      <SignoutModal visible={openSignoutModal} onClose={closeSignoutModal} />
    </View>
  );
};

export default ProfileSection;
