import React, { FC, useMemo } from "react";
import If from "../If";
import Text from "../Text";
import { Container, Content } from "./styles";

type Props = {
  data: { label?: string; value?: string; id: number }[];
  onPress?: (id: number) => () => void;
  expand?: () => void;
  expandLabel?: string;
};

const LabeledValueList: FC<Props> = function ({
  data,
  onPress = () => null,
  expand,
  expandLabel = "Full Cast & Crew",
}) {
  const ListMemo = useMemo(() => {
    return data.map(({ id, label, value }, index) => (
      <Content key={`crew-${id}-${index}`} onPress={onPress(id)}>
        <If conditional={!!label && label.length > 0}>
          <Text variant="sectionTitle">{label}</Text>
        </If>
        <If conditional={!!value && value.length > 0}>
          <Text>{value}</Text>
        </If>
      </Content>
    ));
  }, [data]);

  return (
    <Container>
      {ListMemo}
      <If conditional={!!expand}>
        <Content>
          <Text variant="sectionTitle">{expandLabel}</Text>
        </Content>
      </If>
    </Container>
  );
};

export default LabeledValueList;
