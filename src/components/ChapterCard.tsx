import React from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Chapter } from '../service/chapterService';

type Props = {
  chapter: Chapter;
};

export default function ChapterCard({ chapter }: Props) {  
  const { width: windowWidth } = useWindowDimensions();
  

  const isSmallScreen = windowWidth < 600;
  
  return (
    <View style={{ 
      width: '100%', 
      height: '100%',
      backgroundColor: "#101829",       
      borderRadius: 8, 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      padding: 8,
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      overflow: 'hidden',
     
    }}>
      <Image
        source={{ uri: chapter.image }}
        style={{ 
          width: '100%', 
          height: '73%', 
          resizeMode: "cover"
        }}
      />
      <View style={{ 
        paddingHorizontal: isSmallScreen ? 8 : 12, 
        paddingVertical: isSmallScreen ? 4 : 6,
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <TouchableOpacity>
          <Text style={{ 
            fontSize: isSmallScreen ? 12 : 14, 
            fontWeight: '600', 
            letterSpacing: -0.5, 
            color: "white", 
            marginBottom: 2,
            marginTop: 4, 
          }}>
            Capítulo {chapter.number}
          </Text>
        </TouchableOpacity>
        <Text style={{ 
          fontSize: isSmallScreen ? 14 : 16, 
          fontWeight: '700', 
          color: "white", 
          lineHeight: isSmallScreen ? 16 : 18
        }}>
          {chapter.title}
        </Text>
      </View>
    </View>
  );
}