
import React, { useRef, useState } from "react";
import { View, Dimensions, useWindowDimensions, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import ShowCard from "../components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';


type Show = {
	id: number;
	title: string;
	description: string;
	cover: string;
};

interface Props {
	shows: Show[];
	onCardPress: (id: number) => void;
};

export default function CarouselRender({ shows, onCardPress }: Props) {
	const progress = useSharedValue<number>(0);
	const carouselRef = useRef<any>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const cardsInScreen = 2;
	const gap = 16;
	const { width: windowWidth } = useWindowDimensions();

	const cardWidth = (windowWidth - gap * (cardsInScreen + 1)) / cardsInScreen;
	const carouselWidth = windowWidth - gap * 2;
	const cardHeight = 220;

	// Agrupar shows de a pares
	const groupedShows: Show[][] = [];
	for (let i = 0; i < shows.length; i += 2) {
		groupedShows.push(shows.slice(i, i + 2));
	}

	const scrollNext = () => {
		const nextIndex = (currentIndex + 1) % groupedShows.length;
		carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
		setCurrentIndex(nextIndex);
	};

	const scrollPrev = () => {
		const prevIndex = (currentIndex - 1 + shows.length) % groupedShows.length;
		carouselRef.current?.scrollTo({ index: prevIndex, animated: true });
		setCurrentIndex(prevIndex);
	};

	return (
		<LinearGradient
		colors={['#101829', '#000000']} // Verde a negro
		start={{ x: 0, y: 1 }}
		end={{ x: 0, y: 0}}
			id="carousel-component"
			style={{ 
				width: carouselWidth, 
				height: cardHeight,
				
				borderRadius: 8,
				alignSelf: "center",
				overflow: 'hidden',
			}}
		>
			<Carousel
				ref={carouselRef}
				autoPlay={false}
				data={groupedShows}
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
					<View style={{ flexDirection: "row", gap, paddingHorizontal: gap }}>
						{item.map((show) => (
							<View key={show.id} style={{ width: cardWidth, height: cardHeight }}>
								<ShowCard
									id={show.id}
									title={show.title}
									description={show.description}
									cover={show.cover}
									onPress={onCardPress}
								/>
							</View>
						))}
					</View>
				)}
			/>
			{/*<TouchableOpacity
				onPress={scrollPrev}
				style={{ 
					position: "absolute", 
					left: 0, 
					top: 0, 
					justifyContent: "center", 
					alignItems: "center",
					height: cardHeight, 
					width: 40 
				}}
			>
				<ChevronLeft color="white" size={32} />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={scrollNext}
				style={{ 
					position: "absolute", 
					right: 0, 
					top: 0, 
					justifyContent: "center", 
					alignItems: "center",
					height: cardHeight, 
					width: 40 
				}}
			>
				<ChevronRight color="white" size={32} />
			</TouchableOpacity>*/}
		</LinearGradient>
	);
}

