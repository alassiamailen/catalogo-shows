import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Chapter } from '../service/chapterService';

type Props = {
  chapter: Chapter;
};

export default function ChapterCard({ chapter }: Props) {  
  return (
    <View className="w-full max-w-sm m-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Image
        source={{ uri: chapter.image }}
        className="rounded-t-lg h-56 w-full "
        resizeMode="cover"
      />
      <View className="px-5 pb-5">
        <TouchableOpacity>
          <Text className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Capítulo {chapter.number}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center flex-1 justify-between ">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            {chapter.title}
          </Text>
        </View>
      </View>
    </View>
  );
}