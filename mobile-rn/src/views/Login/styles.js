import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 152,
    height: 60,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    padding: 20,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#7159c1',
    marginHorizontal: 10,
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  buttonLogin: {
    marginTop: 40,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#7159c1',
    width: '95%',
  },
  loginText: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2,
    fontWeight: '700',
  },
});

export default styles;
