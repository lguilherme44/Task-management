import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: Platform.OS === 'ios' ? 85 : 70,
    backgroundColor: '#0D0D0D',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  button: {
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default styles;
