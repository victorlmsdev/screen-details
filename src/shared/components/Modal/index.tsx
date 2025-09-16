import { Modal as ReactNativeModal } from "react-native";
import { View } from "../Box/styles";
import Text from "../Text";
import { Backdrop, Container } from "./styles";
import Row from "../Row";
import Separator from "../Separator";
import { FC, PropsWithChildren } from "react";

export type ModalProps = {
  visible: boolean;
  closeOnBackdrop?: boolean;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  closeOnBackdrop,
  visible,
  onClose,
  children,
  ...rest
}) => {
  return (
    <ReactNativeModal
      {...{ visible }}
      backdropColor={"transparent"}
      animationType="fade">
      <Backdrop
        onPress={closeOnBackdrop ? onClose : undefined}
        android_ripple={{
          color: "rgba(255, 255, 255, 0.1)",
          borderless: true,
        }}>
        <Container {...rest}>{children}</Container>
      </Backdrop>
    </ReactNativeModal>
  );
};

export default Modal;
