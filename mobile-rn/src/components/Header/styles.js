import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#0D0D0D',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    width: 100,
    height: 44,
  },
  notification: {
    position: 'absolute',
    right: 20,
  },
  notificationImage: {
    width: 30,
    height: 30,
  },
  circle: {
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 13,
  },
  notificationText: {
    fontWeight: 'bold',
    color: '#7159c1',
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
  },
  leftIconImage: {
    width: 24,
    height: 24,
  },
});

export default styles;
