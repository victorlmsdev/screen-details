import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {ActionButton, ListFooterComponent} from '~/shared/components';

type Props = {
  genres: {id: number; name: string}[];
};

const GenresList: FC<Props> = function ({genres}) {
  return (
    <FlatList
      horizontal
      data={genres}
      keyExtractor={item => `genre-${item.id}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={{marginLeft: 8, marginVertical: 16}}>
          <ActionButton title={item.name} />
        </View>
      )}
      ListHeaderComponent={<ListFooterComponent />}
      ListFooterComponent={() => <ListFooterComponent />}
    />
  );
};

export default GenresList;
