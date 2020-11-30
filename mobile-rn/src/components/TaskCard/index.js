import React, { useMemo } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import styles from './styles';

import typeIcons from '../../utils/typeIcons';
import iconDone from '../../assets/done.png';

export default function TaskCard({
  id,
  title,
  description,
  when,
  done,
  type,
  navigation,
}) {
  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'), [when]);
  const hour = useMemo(() => format(new Date(when), 'HH:mm'), [when]);
  return (
    <TouchableOpacity
      style={[styles.card, done && styles.cardDone]}
      onPress={() =>
        navigation.push('Task', {
          id: id,
        })
      }
    >
      <View style={styles.cardLeft}>
        {done ? (
          <Image source={iconDone} style={styles.iconDone} />
        ) : (
          <Image source={typeIcons[type]} style={styles.typeActive} />
        )}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardRight}>
        <Text style={styles.cardDate}>{date}</Text>
        <Text style={styles.cardHour}>{hour}</Text>
      </View>
    </TouchableOpacity>
  );
}
