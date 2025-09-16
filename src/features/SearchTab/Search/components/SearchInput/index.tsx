import React, { FC, useCallback, useEffect, useRef } from "react";
import { Container, InnerBorder, Input } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "styled-components/native";
import useTranslation from "~/shared/hooks/useTranslate";

type Props = {
  onChange: (value: string) => void;
};

const SearchInput: FC<Props> = function ({ onChange }) {
  const { getPageTranslations } = useTranslation();
  const translation = getPageTranslations("search") as Translation["search"];

  const timerRef = useRef<any>(null);

  const onBackgroundColor = useTheme().colors.onBackground;

  const onChangeTextCallback = useCallback(
    (value: string) => {
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => onChange(value), 500);
    },
    [timerRef],
  );

  return (
    <Container>
      <InnerBorder>
        <Ionicons name="search" size={24} color={onBackgroundColor} />
        <Input
          placeholder={translation.placeholder}
          numberOfLines={1}
          onChangeText={onChangeTextCallback}
          onEndEditing={e => onChange(e.nativeEvent.text)}
          placeholderTextColor={onBackgroundColor}
        />
      </InnerBorder>
    </Container>
  );
};

export default SearchInput;
