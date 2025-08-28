
import React, { useRef, useState } from "react";
import { View, Dimensions, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import ChapterCard from "../components/ChapterCard";
import { Chapter } from "../service/chapterService";
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    chapters: Chapter[];
};

export default function CarouselDetail({ chapters }: Props) {
    const progress = useSharedValue<number>(0);
    const carouselRef = useRef<any>(null);
    const cardsInScreen = 1; // Una carta a la vez
    const { width: windowWidth } = useWindowDimensions();

    // Ancho responsivo: 90% del ancho de pantalla, máximo 400px
    const carouselWidth = Math.min(windowWidth * 0.9, 400);
    const cardWidth = carouselWidth;
    const cardHeight = Math.min(windowWidth * 0.5, 200); // Altura proporcional al ancho

    return (
        <LinearGradient
            colors={['#101829', '#000000']} // Verde a negro
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            id="carousel-component"
            style={{
                width: carouselWidth,
                height: cardHeight,               
                borderRadius: 8,
                alignSelf: "center"
            }}
        >
            <Carousel
                ref={carouselRef}
                autoPlay={false}
                data={chapters}
                width={carouselWidth}
                height={cardHeight}
                loop={false}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                overscrollEnabled={false}
                vertical={false}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View style={{
                        width: cardWidth,
                        height: cardHeight,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <ChapterCard
                            chapter={item}
                        />
                    </View>
                )}
            />
        </LinearGradient>
    );
}

