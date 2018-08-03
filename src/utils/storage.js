import { AsyncStorage } from 'react-native'

export const storeData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value), callback);
  }
  catch (error) {
    console.log(error)
  }
}

export const removeData = async (key, callback) => {
  try {
    await AsyncStorage.removeItem(key, callback);
  }
  catch (error) {
    console.log(error)
  }
}

export const retrieveData = async (key, callback) => {
  try {
    await AsyncStorage.getItem(key, (err, data) => {
      if (err) {
        return console.log(err)
      }
      callback(JSON.parse(data))
    });
  }
  catch (error) {
    console.log(error)
  }
}

export const updateData = async (key, value, callback) => {
  try {
    retrieveData(key, data => {
      console.log(Object.assign(data, value))
      storeData(key, Object.assign(data, value), callback);
    })
  }
  catch (error) {
    console.log(error)
  }
}