import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity,ScrollView  } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../App';
import { getCategories,Category } from '../service/categoryService';
import { useState, useEffect } from "react";
import { getNovels, Novel } from '../service/novelService';
import ShowCard from '../components/Card';


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
          getNovels()
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


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1f332c', paddingHorizontal: 16, paddingTop: 16 }} >
      {categories.map((category) => (
        <View key={category.id} style={{ marginBottom: 24 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{category.name}</Text>
          <FlatList
            horizontal
            data={category.shows}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ShowDetailScreen', { showId: item.id, showImage: item.cover, showTitle: item.title})}
              >
                <ShowCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  cover={item.cover}
                  style={{ minWidth: 150, marginRight: 12 }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}