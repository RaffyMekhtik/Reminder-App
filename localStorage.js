import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData(key){
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }

  }

export async function storeData(key,value){
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export async function clearAll() {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
  }

export async function removeValue(value){
    try {
      await AsyncStorage.removeItem(value)
    } catch(e) {
      // remove error
    }
  }