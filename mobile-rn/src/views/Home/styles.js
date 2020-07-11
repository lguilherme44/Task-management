import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },

  filter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    alignItems: 'center',
  },

  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#7159c1',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  filterTextInative: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ccc',
    opacity: 0.5,
  },

  content: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 90,
    marginTop: Constants.statusBarHeight,
  },

  title: {
    width: '100%',
    alignItems: 'center',
  },

  titleText: {
    color: '#ccc',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 2,
  },

  footer: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2.5,
    borderTopColor: '#7159c1',
    alignItems: 'center',
  },

  button: {
    position: 'relative',
    top: -20,
  },

  image: {
    width: 60,
    height: 60,
  },
});

export default styles;
