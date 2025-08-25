import React from 'react';
import { View, Image, Text } from 'react-native';
import { Chapter } from '../service/chapterService';

type Props = {
    chapter: Chapter;  
};

export default function ChapterCard({chapter}: Props){   
    
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
            marginBottom: 16,
            overflow: 'hidden',
            alignItems: 'center',
            width: '95%'
          }}>
          <Image
            source={{ uri: chapter.image }}
            style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1, paddingVertical: 8 }}>
            <Text style={{ color: 'gray', fontWeight: '600' }}>
              Capítulo {chapter.number}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>
              {chapter.title}
            </Text>
          </View>
        </View>
      );
}