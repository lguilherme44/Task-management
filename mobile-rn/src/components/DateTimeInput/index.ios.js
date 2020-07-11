import React, { useState } from 'react';

import { TouchableOpacity, Image, DatePickerIOS } from 'react-native';

import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInputIOS({ type }) {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <TouchableOpacity style={styles.input}>
      <DatePickerIOS
        date={dateTime}
        mode={type}
        minimumDate={new Date()}
        onDateChange={setDateTime}
        customStyles={{
          datePicker: {
            backgroundColor: 'white',
          },
        }}
      />
      <Image
        style={styles.iconTextInput}
        source={type === 'date' ? iconCalendar : iconClock}
      />
    </TouchableOpacity>
  );
}
