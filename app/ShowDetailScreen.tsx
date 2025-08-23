import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from "@react-navigation/stack";
import { novelas } from '../novela';


type ShowDetailScreenRouteProp = RouteProp<RootStackParamList, 'ShowDetailScreen'>;

type Props = {
  route: ShowDetailScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "ShowDetailScreen">;
};

export default function ShowDetailScreen({ route }: Props) {
  const { showId } = route.params;
  const novel = novelas.find((n) => n.id === showId);
  const capitulos = ["Capítulo 1", "Capítulo 2", "Capítulo 3"];

  if (!novel) {
    return (
      <View style={styles.container}>
        <Text>No se encontró la novela</Text>
      </View>
    );
  }

 
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: novel.portada }} style={styles.image} />
      <Text style={styles.title}>{novel.titulo}</Text>
      <Text style={styles.description}>{novel.descripcion}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Capítulos</Text>
        {capitulos.map((cap, index) => (
          <Text key={index} style={styles.chapter}>
            {cap}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: "100%", height: 200, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 16, marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  chapter: { fontSize: 16, marginTop: 3 },
});