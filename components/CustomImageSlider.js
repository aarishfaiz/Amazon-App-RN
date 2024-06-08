import React, { useRef } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width } = Dimensions.get('window');

const CustomImageSlider = ({ images }) => {
    const scrollViewRef = useRef();
    let currentIndex = 0;

    const scrollToIndex = (index) => {
        scrollViewRef.current.scrollTo({ x: index * width, animated: true });
        currentIndex = index;
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        scrollToIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        scrollToIndex(newIndex);
    };

    return (
        <View style={styles.sliderContainer}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                    currentIndex = index;
                }}
            >
                {images.map((image, index) => (
                    <View style={styles.slide} key={index}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.leftArrow} onPress={goToPrevious}>
                <Text style={styles.arrowText}>&#10094;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightArrow} onPress={goToNext}>
                <Text style={styles.arrowText}>&#10095;</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    leftArrow: {
        position: 'absolute',
        top: '50%',
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 30,
    },
    rightArrow: {
        position: 'absolute',
        top: '50%',
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 30,
    },
    arrowText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default CustomImageSlider;
