
import { View, FlatList, Image, Text, TouchableOpacity,ScrollView,SafeAreaView ,StatusBar  } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';
import { getCategories,Category } from '../service/categoryService';
import { useState, useEffect } from "react";
import { getNovels, Novel } from '../service/novelService';
import ShowCard from '../components/Card';
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

  useEffect(()=>{
    const fetch = async ()=>{
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
  if (loading) return <Text className="text-white p-4">Cargando catálogo...</Text>;
  console.log(categories[1].shows);  
  
 return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 32 }}
      nestedScrollEnabled={true}
    >
      {categories.map((category) => (
       <View key={category.id} className="mb-2">
        <View className="text-white text-xl font-bold bg-[#d64336]"> 
       <Text className="text-white text-xl font-bold bg-[#d64336]">
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
