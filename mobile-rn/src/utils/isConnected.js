import AsyncStorage from "@react-native-async-storage/async-storage";

const isConnected = async () => {
  const json = await AsyncStorage.getItem("@RNAuth:userId");
  return JSON.parse(json);
};

export default isConnected;

// async function isConnected() {
//   try {
//     const jsonValue = await AsyncStorage.getItem("@RNAuth:userId");
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // read error
//   }

//   console.log("Done.");
// }

// export default isConnected;
