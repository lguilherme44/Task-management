import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

/* Icons */
import add from '../../assets/add.png';
import save from '../../assets/save.png';

/* Styles */
import styles from './styles';

export default function Footer({ icon, onPress }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={icon === 'add' ? add : save} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}
