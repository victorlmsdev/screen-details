import { onlineManager } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";
import { Box, Button, Text } from "~/shared/components";

type Props = {
  error: string;
  callback: () => void;
  callbackText: string;
};

const Error = ({ error, callback, callbackText }: Props) => {
  const handleCallback = () => {
    if (!onlineManager.isOnline())
      ToastAndroid.show("Sem internet", ToastAndroid.LONG);
    callback();
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="title">{error}</Text>
      <Button onPress={handleCallback} style={{ margin: 16 }}>
        <Text variant="title">{callbackText ?? "Voltar"}</Text>
      </Button>
    </Box>
  );
};

export default Error;
