import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default Result = ({ route }) => {
  const { floorName, area } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        {floorName}
        {area}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  issue: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 5,
    marginTop: 10,
    position: 'absolute',
  },
  issueText: {
    color: 'white',
    fontSize: 16,
  },
});