import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BackgroundImageWithClickableAreas = ({ navigation, route }) => {
  const [clickedArea, setClickedArea] = useState(null);

  const handleAreaClick = async (area) => {
    setClickedArea(area);
    await navigation.navigate("ResultButton", {
        floorName: route.params.floorName,
        area: area,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/1F.png')} // Replace with the path to your image
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.areaTopLeft}
        onPress={() => handleAreaClick('左上')}
      />
      <TouchableOpacity
        style={styles.areaTopRight}
        onPress={() => handleAreaClick('右上')}
      />
      <TouchableOpacity
        style={styles.areaBottomLeft}
        onPress={() => handleAreaClick('左下')}
      />
      <TouchableOpacity
        style={styles.areaBottomRight}
        onPress={() => handleAreaClick('右下')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  areaTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change color for visual indication
  },
  areaTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change color for visual indication
  },
  areaBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change color for visual indication
  },
  areaBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change color for visual indication
  },
});

export default BackgroundImageWithClickableAreas;
