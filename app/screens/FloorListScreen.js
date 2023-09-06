import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

var MOCKED_DATA=[
    {
        floorId: '1',
        floorName: '一樓',
    },
    {
        floorId: '2',
        floorName: '二樓',
    },
    {
        floorId: '3',
        floorName: '三樓',
    },
    {
        floorId: '4',
        floorName: '四樓',
    },
    {
        floorId: '5',
        floorName: '五樓',
    },
    {
        floorId: '6',
        floorName: '六樓',
    },
    {
        floorId: '7',
        floorName: '七樓',
    },
    {
        floorId: '8',
        floorName: '八樓',
    },
    {
        floorId: '9',
        floorName: '九樓',
    },
]


export default FloorListScreen = ({ navigation, route }) => {
    const [floorList, setFloorList] = useState([]);
    const [selectedFloorId, setSelectedFloorId] = useState('');
    const [selectedFloorName, setSelectedFloorName] = useState('');

    useEffect(() => {
      setFloorList(MOCKED_DATA)
    }, []);

    const floorClickHandler = async (item) => {
        setSelectedFloorId(item.floorId)
        setSelectedFloorName(item.floorName)
        Alert.alert(
            '選擇列表', '請選擇其中一個選項', 
            [
                {
                    text: 'method_pin',
                    onPress: async () => {
                        await navigation.navigate("IssueLocationMapPin", {
                            project: route.params.project,
                            floorId: item.floorId,
                            floorName: item.floorName,
                        });
                    }
                },
                {
                    text: 'method_AR', 
                    onPress: async () => {
                        await navigation.navigate("IssueLocationMapAddButton", {
                            project: route.params.project,
                            floorId: item.floorId,
                            floorName: item.floorName,
                        });
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
        );   
    }    

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
          <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={{width:'85%'}}>
              <Text style={[styles.title, textColor]} ellipsizeMode={'tail'} numberOfLines={1}>
                {item.floorName}
              </Text>
            </View>
          </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.floorId === selectedFloorId ? '#600000' : '#ffffff';
        const color = item.floorId === selectedFloorId ? 'white' : 'black';
        return(
            <React.Fragment>
                <Item
                    item={item}
                    key={item.floorId}
                    onPress={() => floorClickHandler(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
            </React.Fragment>
        );
    };


    return(
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={floorList}
                    renderItem={renderItem}
                    keyExtractor={item => item.floorId} 
                />
            </SafeAreaView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
    flatList: {
        padding:10,
      },
    item: {
    marginVertical:5,
    padding:20,
    borderRadius:10,
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
    },
    title: {
        marginVertical:1,
        marginLeft: 8,
        fontSize: 20,
    },
})
