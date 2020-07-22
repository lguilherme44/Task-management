import AsyncStorage from '@react-native-community/async-storage';

const isConnected = AsyncStorage.getItem('@storage_key');

export default isConnected;
