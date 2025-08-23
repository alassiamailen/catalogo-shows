import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { novelas } from '../novela';
import ShowDetailScreen from './ShowDetailScreen';
import { useNavigation } from "@react-navigation/native";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

const categories = [
  {
    id: 1,
    name: "Drama",
    shows: [novelas[0], novelas[1]],
  },
  {
    id: 2,
    name: "Comedia",
    shows: [novelas[2]],
  },
];

export default function Home({ navigation }: Props) {
  const renderNovel = ({ item }: { item: typeof novelas[0] }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShowDetailScreen', { showId: item.id })
      }
      style={{
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
      }}
    >
      <Image
        source={{ uri: item.portada }}
        style={{ width: 150, height: 100, borderRadius: 8 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>
        {item.titulo}
      </Text>
      <Text>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
        {item.name}
      </Text>
      <FlatList
        data={item.shows}
        keyExtractor={(novela) => novela.id.toString()}
        renderItem={renderNovel}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCategory}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
  );
}