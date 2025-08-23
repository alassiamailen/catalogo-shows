import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    title: string;
  };
  
  export default function ShowCard({ title }: Props) {
    return (
      <View style={{
        width: 120,
        height: 180,
        backgroundColor: '#ccc',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
      }}>
        <Text>{title}</Text>
      </View>
    );
  }