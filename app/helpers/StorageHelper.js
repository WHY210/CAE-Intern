import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('存儲成功:', key, value);
  } catch (error) {
    console.log('存儲失敗:', error);
  }
};

export const getStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.log('讀取失敗:', error);
    return null;
  }
};

export const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('刪除成功:', key);
  } catch (error) {
    console.log('刪除失敗:', error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log('讀取鍵值列表失敗:', error);
    return [];
  }
};
