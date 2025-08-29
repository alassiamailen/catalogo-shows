import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

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
      <View style={{ 
        width: '100%', 
        height: '100%',
        borderRadius: 12,
        padding: 8,
        backgroundColor: "#101829",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Image
          source={{ uri: cover }}
          style={{ width: '100%', height: 160, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />

        <Text style={{ 
          color: "white", 
          fontSize: 14, 
          fontWeight: "600", 
          textAlign: "center",         
          paddingHorizontal: 8, 
          paddingVertical: 4, 
          borderRadius: 4 
        }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}