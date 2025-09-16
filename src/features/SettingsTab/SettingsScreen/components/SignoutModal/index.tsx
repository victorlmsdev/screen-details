import { FC, useEffect } from "react";
import useDeleteSession from "~/features/SettingsTab/hooks/useDeleteSession";
import { Button, Column, Modal, Row, Text } from "~/shared/components";
import { ModalProps } from "~/shared/components/Modal";
import useTranslation from "~/shared/hooks/useTranslate";

const SignoutModal: FC<ModalProps> = ({ onClose, ...rest }) => {
  const { getPageTranslations } = useTranslation();

  const translations = getPageTranslations("profile") as Translation["profile"];

  const { mutate: signOutMutation, isPending, isSuccess } = useDeleteSession();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  return (
    <Modal {...rest} onClose={onClose}>
      <Column width={"100%"} alignItems="center" margin={"0px 0px 24px 0px"}>
        <Text variant="title" style={{ marginBottom: 8 }}>
          {translations.signoutModalTitle}
        </Text>
        <Text style={{ textAlign: "justify" }}>
          {translations.signoutModalDescription}
        </Text>
      </Column>

      <Row justifyContent="space-between" width={"100%"}>
        <Button
          width={"45%"}
          disabled={isPending}
          loading={isPending}
          onPress={onClose}>
          {translations.signoutModalCancelBt}
        </Button>
        <Button
          width={"45%"}
          disabled={isPending}
          loading={isPending}
          onPress={() => signOutMutation()}>
          {translations.signoutModalConfirmBt}
        </Button>
      </Row>
    </Modal>
  );
};

export default SignoutModal;
