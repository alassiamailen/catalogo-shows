import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './../../App';
import { StackNavigationProp } from "@react-navigation/stack";
import { getChaptersByNovel, Chapter } from '../service/chapterService';
import { getNovelById, Novel } from '../service/novelService';
import CarouselDetail from './carouselDetail';

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

  if (loading) return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", padding: 16, fontSize: 18 }}>Cargando catálogo...</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ paddingBottom: 16 }}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Image
          source={{ uri: novel.cover }}        
          resizeMode="cover"
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            maxHeight: Dimensions.get('window').height * 0.4,
          }}
        />
        <View style={{ paddingHorizontal: 16, paddingVertical: 24,marginTop: -16 }}>
          <Text style={{ 
            fontSize: 28, 
            textAlign: "center", 
            marginBottom: 24, 
            paddingHorizontal: 16,           
            color: "white",
            fontWeight: "bold",            
          }}>
            {novel.title}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 24, marginTop: -35}}>
          <Text style={{ 
            fontSize: 24, 
            textAlign: "center", 
            marginBottom: 24, 
            paddingHorizontal: 16,            
            color: "white"
          }}>
            {novel.description}
          </Text>
        </View>    

        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 16, color: "#9ca3af" }}>
            Cargando capítulos...
          </Text>
        ) : (
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <Text style={{ 
              color: "white", 
              fontSize: 20, 
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16
            }}>
              Capítulos
            </Text>
            <CarouselDetail chapters={chapters} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

