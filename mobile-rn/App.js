import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/contexts/auth";
import { AppContextProvider } from "./src/contexts/appContext";

import Routes from "./src/routes";

/* Disable alerts */
// console.disableYellowBox = true;

/* Native Base */
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function isSigned() {
      try {
        await AsyncStorage.getItem("@storage_key");
      } catch (e) {
        alert(e);
      }
    }

    isSigned();
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
