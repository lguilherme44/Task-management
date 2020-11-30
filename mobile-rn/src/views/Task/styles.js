import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 14,
    resizeMode: 'contain',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    letterSpacing: 2,
  },
  input: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    padding: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#7159c1',
    marginHorizontal: 10,
    fontWeight: '100',
  },
  inputArea: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: '#7159c1',
    marginHorizontal: 10,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
    fontWeight: '100',
  },
  inLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 80,
  },
  inputInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    fontWeight: 'bold',
    color: '#7159c1',
    textTransform: 'uppercase',
    fontSize: 16,
    paddingLeft: 10,
  },
  removeLabel: {
    fontWeight: 'bold',
    color: '#F25F5C',
    textTransform: 'uppercase',
    fontSize: 16,
    paddingLeft: 10,
  },
  typeIconInative: {
    opacity: 0.3,
  },

  // button: {
  //   borderRadius: 10,
  //   backgroundColor: '#7159c1',
  //   justifyContent: 'center',
  //   marginTop: 35,
  // },
});

export default styles;
