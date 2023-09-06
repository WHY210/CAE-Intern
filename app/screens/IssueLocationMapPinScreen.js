import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ActionSheetIOS } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';
import { Icon } from 'react-native-elements';


const ISSUE_TYPE = [
  {
    titles: [ '全部', '墜落', '機械', '物料', '感電', '防護具', '穿刺', '爆炸', '工作場所', '搬運', '其他' ],
  },
];

export default function Result({ navigation, route }) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
          issueGet.push(item);
        }
      }
      setSelectedIssue(issueGet)
    } catch (error) {
      console.log('loadStorage error:', error);
    }
  };

  const floorImagePath = {
    "1": require('../assets/1F.png'),
    "2": require('../assets/2F.png'),
    "3": require('../assets/3F.png'),
    "4": require('../assets/4F.png'),
    "5": require('../assets/5F.png'),
    "6": require('../assets/2F.png'),
    "7": require('../assets/3F.png'),
    "8": require('../assets/4F.png'),
    "9": require('../assets/9F.png'),
  };

  const issueLocationAddHandler = async () => {
    navigation.navigate('IssueLocationMapAddPin', {
      project: route.params.project,
      floorName: route.params.floorName,
      floorId: route.params.floorId
    });
  };

  const issueFilterHandler = () => {
    try {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: '顯示缺失類別',
          options: ['全部', '墜落', '機械', '物料', '感電', '防護具', '穿刺', '爆炸', '工作場所', '搬運', '其他', '取消'],
          cancelButtonIndex: 11,
        },
        buttonIndex => {
          if (buttonIndex === 11) {
            // Cancel action
          } else {
            setSelectedFilter(ISSUE_TYPE[0].titles[buttonIndex]);
          }
        }
      );
    } catch (error) {
      console.log('issueFilterHandler error:', error);
    }
  };
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
            <React.Fragment>
              <Icon
                style={{ marginRight: 10 }}
                name="filter-outline"
                type="ionicon"
                color="dodgerblue"
                size={30}
                onPress={issueFilterHandler}
              />
              <Icon
                style={{ marginRight: 10 }}
                name="ios-add"
                type="ionicon"
                color="dodgerblue"
                size={30}
                onPress={issueLocationAddHandler}
              /> 
            </React.Fragment>
        </View>
          ),
    });
  }, [navigation, route.params]);



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

  const deleteDataFromStorage = async (keyToRemove) => {
    try {
      await StorageHelper.removeStorage(keyToRemove);
      console.log('Data removed successfully.');
      loadStorage(); // Reload the issue data after deletion
    } catch (error) {
      console.error('Error while removing data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={floorImagePath[route.params.floorId]}
        resizeMode="cover"
      />
      {selectedIssue &&
      selectedIssue
        .filter(item => selectedFilter === '全部' || item.violationType === selectedFilter)
        .map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.issue,
              { left: item.coordinate.x * screenWidth, top: item.coordinate.y * screenHeight },
            ]}
            onPress={() => handlePress(item)}
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