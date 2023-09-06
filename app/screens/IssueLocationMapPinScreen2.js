import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { Icon } from 'react-native-elements';

export default function Result({ navigation, route }) {

  const [issue, setIssue] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const issueLocationAddHandler = async () => {
    navigation.navigate('IssueLocationMapAddPin', {
      project: route.params.project,
      floorName: route.params.floorName,
      floorId: route.params.floorId
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <React.Fragment>
          <Icon
            style={{ marginRight: 10 }}
            name="ios-add"
            type="ionicon"
            color="dodgerblue"
            size={30}
            onPress={issueLocationAddHandler}
          />
        </React.Fragment>
      ),
    });
  }, [navigation, route.params]);

  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    try {
      const keys = await StorageHelper.getAllKeys();
      const issueGet = [];
      for (const key of keys) {
        const item = await StorageHelper.getStorage(key);
        if (item.floorId === route.params.floorId) {
          console.log(item);
          issueGet.push(item);
        }
      }
      setIssue(issueGet);
    } catch (error) {
      console.log('error:', error);
    }
  };

  const floorImagePath = {
    "1": require('../assets/1F.png'),
    "2": require('../assets/2F.png'),
    // ... Rest of the floor image paths ...
    "9": require('../assets/9F.png'),
  };

  const deleteDataFromStorage = async (keyToRemove) => {
    try {
      await StorageHelper.removeStorage(keyToRemove);
      console.log('Data removed successfully.');
      loadStorage(); // Reload the issue data after deletion
    } catch (error) {
      console.error('Error while removing data:', error);
    }
  };

  const handlePress = (item) => {
    Alert.alert(
      `${item.issueType}`,
      `${item.project}${item.floorName}\n缺失類別：${item.violationType}\n缺失項目：${item.issueType}`,
      [
        {
          text: '刪除缺失',
          onPress: () => {
            showDeleteConfirmation(item.key); 
          }
        },
        {
          text: '取消',
          style: 'cancel'
        },
      ]
    );
  };

  const showDeleteConfirmation = (key) => {
    Alert.alert(
      '確認刪除此缺失','',
      [
        {
          text: '確定',
          onPress: () => deleteDataFromStorage(key), // Delete the item with the provided key
        },
        {
          text: '取消',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={floorImagePath[route.params.floorId]}
        resizeMode="cover"
      />
      {issue && issue.length > 0 && issue.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.issue, { left: item.coordinate.x * screenWidth, top: item.coordinate.y * screenHeight }]}
          onPress={() => handlePress(item)} // Pass the item to the handlePress function
        >
          <Text style={styles.issueText}>缺失{index + 1}</Text>
        </TouchableOpacity>
      ))}
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
    opacity: 0.5,
  },
  issue: {
    borderRadius: 2,
    backgroundColor: 'red',
    padding: 2,
    position: 'absolute',
  },
  issueText: {
    color: 'white',
    fontSize: 7,
  },
});