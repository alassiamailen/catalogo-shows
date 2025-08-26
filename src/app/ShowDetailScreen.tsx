import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './../../App';
import { StackNavigationProp } from "@react-navigation/stack";
import { getChaptersByNovel, Chapter } from '../service/chapterService';
import ChapterCard from "../components/ChapterCard";


type ShowDetailScreenRouteProp = RouteProp<RootStackParamList, 'ShowDetailScreen'>;

type Props = {
  route: ShowDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "ShowDetailScreen">;
};

export default function ShowDetailScreen({ route, navigation }: Props) {
  const { showId, showImage, showTitle } = route.params;
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true); 
  console.log("showImage", showImage);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getChaptersByNovel(showId);
        setChapters(data);  
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetch();
  }, [showId]);

  const renderChapter = ({ item }: { item: Chapter }) => (
    <TouchableOpacity className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"> 
  
    <Image
      source={{ uri: item.image}}
      style={{ width: "100%", height: 160 }}
      resizeMode="cover"
    />    
    
    <View className="p-4">
      <Text className="text-gray-500 font-semibold">
        Capítulo {item.number}
      </Text>
      <Text className="text-lg font-bold mt-1 text-gray-800">
        {item.title}
      </Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-white">
        <Image
        source={{ uri: showImage}}
        style={{ width: '100%', height: 256 }} 
        resizeMode="cover"      
      />
      <Text className="text-2xl font-bold text-center mb-6 px-4">{showTitle}</Text>
      {loading ? (
        <Text className="text-center mt-4 text-gray-400">Cargando capítulos...</Text>
      ) : (
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChapterCard chapter={item} />}
          contentContainerStyle={{ paddingBottom: 16, alignItems: 'center' }}
        />
      )}
      
    </View>
  );
}

