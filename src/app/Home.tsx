
import { View, Text, ScrollView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';
import { getCategories} from '../service/categoryService';
import { useState, useEffect } from "react";
import { getNovels, Novel } from '../service/novelService';
import * as React from "react"
import CarouselRender from "./carousel";


type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

type CategoryWithNovels = {
  id: number;
  name: string;
  shows: Novel[];
};

export default function Home({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryWithNovels[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [categoriesData, novelsData] = await Promise.all([
          getCategories(),
          getNovels(),
        ]);

        const categoryByNovel = categoriesData.map(category => ({
          ...category,
          shows: novelsData.filter(novel => novel.id_categorie === category.id)
        }));
        setCategories(categoryByNovel);

      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", padding: 16, fontSize: 18 }}>Cargando catálogo...</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        indicatorStyle="white"
        alwaysBounceVertical={true}
      >
        {categories.map((category) => (
          <View key={category.id} style={{ marginBottom: 16, padding: 16 }}>
            <View style={{             
              padding: 16, 
              borderRadius: 8,
              marginBottom: 16
            }}>
              <Text style={{ 
                color: "white", 
                fontSize: 24, 
                fontWeight: "bold",
                textAlign: "center"
              }}>
                {category.name}
              </Text>
            </View>
            
            <CarouselRender       
         shows={category.shows}
         onCardPress={(novelId) => navigation.navigate("ShowDetailScreen", { showId: novelId})}
       />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
