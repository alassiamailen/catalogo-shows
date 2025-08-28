import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity,Dimensions,ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './../../App';
import { StackNavigationProp } from "@react-navigation/stack";
import { getChaptersByNovel, Chapter } from '../service/chapterService';
import ChapterCard from "../components/ChapterCard";
import { getNovelById, Novel } from '../service/novelService';



type ShowDetailScreenRouteProp = RouteProp<RootStackParamList, 'ShowDetailScreen'>;

type Props = {
  route: ShowDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "ShowDetailScreen">;
};

export default function ShowDetailScreen({ route }: Props) {
  const { showId } = route.params;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [novel, setNovel] = useState<Novel>();
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.4;

  useEffect(() => {
    const fetch = async () => {
      try {

        const [dataChapter, dataNovel] = await Promise.all([
          getChaptersByNovel(showId),
          getNovelById(showId)
        ]);

        setChapters(dataChapter);
        setNovel(dataNovel);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetch();
  }, [showId]);
  if (loading) return <Text className="text-white p-4">Cargando catálogo...</Text>;
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 16 }}>
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: novel.cover }}        
        resizeMode="cover"
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          maxHeight: Dimensions.get('window').height * 0.4,
        }}
      
      />
      <View className="px-4 py-6">
        <Text className="text-2xl text-center mb-6 px-4 bg-white">{novel.title}</Text>
      </View>
      <View className="px-4 py-6">
      <Text className="text-2xl text-center mb-6 px-4 bg-white">{novel.description}</Text>
      </View>    

      {loading ? (
        <Text className="text-center mt-4 text-gray-400">Cargando capítulos...</Text>
      ) : (
        <FlatList
          data={chapters}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChapterCard chapter={item} />}
          columnWrapperStyle={{ justifyContent: 'space-between',
            paddingHorizontal: 16,
         }}
          contentContainerStyle={{ paddingVertical: 16,
          }}
        />
      )}
    </View>
    </ScrollView>
  );
}

