import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ActionSheetIOS } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as StorageHelper from '../helpers/StorageHelper';


const ISSUE_TYPE = [
  {
    titles: [ '墜落', '機械', '物料', '感電', '防護具', '穿刺', '爆炸', '工作場所', '搬運', '其他' ],
  },
];

const Issue = ({ navigation, route }) => {
    const [violationType, setViolationType] = useState(''); // 缺失類別
    const [issueType, setIssueType] = useState(''); // 缺失項目
    const [maxKey, setMaxKey] = useState('');
    
    // 缺失類別
    const violationTypeClickHandler = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                title:'缺失類別',
                options: ['墜落', '機械', '物料', '感電', '防護具', '穿刺', '爆炸', '工作場所', '搬運', '其他', '取消'],
                cancelButtonIndex:10,
            },
            buttonIndex => {
                if (buttonIndex === 10) {
                  // cancel action
                } else {
                  setViolationType(ISSUE_TYPE[0].titles[buttonIndex]);
                  setIssueType('');
                }
            }     
        );
    };

    useEffect(() => {
        fetchItemMax();
    }, []);
    
    const fetchItemMax = async () => {
        try {
            const keys = await StorageHelper.getAllKeys();
            let maxKey = '';
            for (const key of keys) {
                if (key > maxKey) {
                    maxKey = parseInt(key, 10);
                }
            }
            setMaxKey(maxKey);
        } catch (error) {
            console.log('Error fetching maximum key: ', error);
        }
    };
    

    // 提交
    const handleSubmit = async() => {
        try {
            await StorageHelper.setStorage(String(maxKey + 1), { 
              key: String(maxKey + 1),
              coordinate: route.params.newCoordinate,
              project: route.params.project,
              floorName: route.params.floorName,
              floorId: route.params.floorId,
              violationType: violationType,
              issueType: issueType,
            }); 
        } catch (error) {
            console.log('error: ', error);
        }
      
        try {
            const keys = await StorageHelper.getAllKeys();
            console.log('儲存區內的全部內容:');
            for (const key of keys) {
              const value = await StorageHelper.getStorage(key);
              console.log(key, ':', value);
            }
        } catch (error) {
            console.log('error: ', error);
        }
        navigation.navigate("ProjectList", {
            coordinate: route.params.newCoordinate,
            floorId: route.params.floorId,
            violationType: violationType,
            issueType: issueType,
        });

        // 清空表單
        setViolationType('');
        setIssueType('');
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.group}>

                <TouchableOpacity onPress={violationTypeClickHandler}>
                    <View style={styles.item}>
                        <Text style={styles.title}>缺失類別</Text>
                        <View style={styles.text_and_icon}>
                            <Text style={styles.description}>
                            {violationType ? violationType : '選取缺失類別'}
                            </Text>
                            <Ionicons
                                style={styles.icon}
                                name={'ios-chevron-forward'}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <Separator />

                <View style={styles.item}>
                    <Text style={styles.title}>缺失項目</Text>
                    <View style={styles.text_and_icon}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setIssueType}
                        value={issueType}
                        placeholder="輸入缺失項目"
                    />
                    </View>
                </View>

                <Separator />

                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>提交</Text>
                    </View>
                </TouchableOpacity>

                <Separator />

            </View>
        </ScrollView>
        </SafeAreaView>
    );
    };

    const Separator = () => <View style={styles.separator} />;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    group: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 12,
        marginHorizontal: 15,
        marginBottom: 20,
        marginTop: 15,
    },
    item: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
    },
    description: {
        width: '90%',
        fontSize: 18,
        textAlign: 'right',
        color: 'gray',
    },
    icon: {
        fontSize: 18,
        color: 'gray',
    },
    textInput: {
        fontSize: 18,
        color: 'gray',
        width: 180,
        textAlign: 'right',
    },
    text_and_icon: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#600000',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
    },
});


export default Issue;