
import React, { useRef, useState } from "react";
import { View, Dimensions, useWindowDimensions, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import ShowCard from "../components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react-native";


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
		<View
			id="carousel-component"
			className="bg-[#e8e2d5] rounded-lg mx-auto"
			style={{ width: carouselWidth, height: cardHeight }}
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
				overscrollEnabled={true}
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
			<TouchableOpacity
				onPress={scrollPrev}
				className="absolute left-0 top-0 justify-center items-center"
				style={{ height: cardHeight, width: 40 }}
			>
				<ChevronLeft color="white" size={32} />
			</TouchableOpacity>

			{/* Flecha derecha */}
			<TouchableOpacity
				onPress={scrollNext}
				className="absolute right-0 top-0 justify-center items-center"
				style={{ height: cardHeight, width: 40 }}
			>
				<ChevronRight color="white" size={32} />
			</TouchableOpacity>
		</View>
	);
}

