import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {

  const handleToDoList = () => {
    navigation.navigate('ToDoList'); 
  }
  const handleARKit = () => {
    navigation.navigate('Viewer'); 
  }
  const handleAR = () => {
    navigation.navigate('AR'); 
  }
  const handleProjectList = () => {
    navigation.navigate('ProjectList'); 
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.button} onPress={handleToDoList}> 
        <Text style={styles.text}>ToDoList</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleARKit}> 
        <Text style={styles.text}>Model</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAR}> 
        <Text style={styles.text}>AR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleProjectList}> 
        <Text style={styles.text}>ProjectList</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignContent: "center"
  },
  text: {
    color: "white"
  }
});
