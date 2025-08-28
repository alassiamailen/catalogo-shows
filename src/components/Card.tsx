import React from 'react';
import { View, Image, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


type Props = {
  id: number;
  title: string;
  description: string;
  cover: string;
  onPress: (id: number) => void;

};

export default function ShowCard({ id, title, cover, onPress }: Props) {

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
    >
      <View style={{ width: '100%', height: '100%' }}
        className="rounded-xl p-2 shadow-md bg-[#101829]"
      >
        <Image
          source={{ uri: cover }}
          style={{ width: '100%', height: 160, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />

        <Text className="text-white text-sm font-semibold text-center bg-black px-2 py-1 rounded">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}