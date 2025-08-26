import React from 'react';
import { View, Image, Text, StyleProp, ViewStyle} from 'react-native';


type Props = {
  id: number;
  title: string;
  description: string;
  cover: string; 
  style?: StyleProp<ViewStyle>;
  
};
  
  export default function ShowCard({ id,title,cover,style}: Props) {   
    
    return (
      <View style={[{ backgroundColor: 'white', borderRadius: 12, padding: 8 }, style]}>
      <Image
        source={{ uri: cover}}
        style={{ width: 120, height: 160, borderRadius: 8, marginBottom: 8 }}
        resizeMode="cover"
      />
      
      <Text className='!text-red-500'>{title}</Text>
    </View>
    );
  }