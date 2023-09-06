import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';


var MOCKED_DATA=[
    {
      projectId: '1',
      projectName: '土研',
    },
]
  
export default ProjectListScreen = ({ navigation }) => {
  
    const [projectList, setProjectList] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [selectedProjectName, setSelectedProjectName] = useState('');
      
  
    useEffect(() => {
        setProjectList(MOCKED_DATA);
    }, []);    

    ////////////把projectSelectHandler改過去就好的樣子///////////////////////////////////////
    const projectSelectHandler = (item) => {
        setSelectedProjectId(item.projectId);
        setSelectedProjectName(item.projectName);
        Alert.alert(
            '選擇列表', 
            '請選擇其中一個選項', 
            [
                {
                    text: '缺失項目列表',
                    onPress: async (item) => {
                        await navigation.navigate("IssueList", {
                            project: selectedProjectName,
                        });
                    }
                },
                {
                    text: '地圖樓層列表', 
                    onPress: async (item) => {
                        await navigation.navigate("FloorList", {
                            project: selectedProjectName,
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
    /////////////////////////////////////////////////////////////////////////////////
  
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={{width:'85%'}}>
                <Text style={[styles.title, textColor]} ellipsizeMode={'tail'} numberOfLines={1}>
                  {item.projectName}
                </Text>
            </View>
        </TouchableOpacity>
    );
  
    const renderItem = ({ item }) => {
        const backgroundColor = item.projectId === selectedProjectId ? '#600000' : '#ffffff';
        const color = item.projectId === selectedProjectId ? 'white' : 'black';
        return(
            <React.Fragment>
                <Item
                    item={item}
                    key={item.projectId}
                    onPress={() => projectSelectHandler(item)}
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
                    data={projectList}
                    renderItem={renderItem}
                    keyExtractor={item => item.projectId} 
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