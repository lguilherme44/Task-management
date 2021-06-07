import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

/* Styles */
import styles from "./styles";

/* Icons */
import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";
import back from "../../assets/back.png";

import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import AuthProvider from "../../contexts/auth";

export default function Header({
  showNotification,
  showBack,
  notifications,
  navigation,
}) {
  const [lateCount, setLateCount] = useState();
  const navigate = useNavigation();
  const { signOut } = useContext(AuthProvider);

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/${parseInt(1, 10)}`).then((response) => {
        setLateCount(response.data.length);
      });
    }

    lateVerify();
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      {showBack && (
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigate.goBack()}
        >
          <Image source={back} style={styles.leftIconImage} />
        </TouchableOpacity>
      )}

      {showNotification && (
        <TouchableOpacity style={styles.notification} onPress={notifications}>
          <Image style={styles.notificationImage} source={bell} />
          <View style={styles.circle}>
            <Text style={styles.notificationText}>{lateCount}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
