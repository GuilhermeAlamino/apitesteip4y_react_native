import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  buttonEdit: {
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#006400',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  titleSelect: {
    color: '#000',
  },
  buttonRecomecar: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    color: '#000',
    backgroundColor: "white"
  },
  picker: {
    height: 40,
    width: '100%',
  },
  generoButton: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    width: '100%',
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  generoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#006400',
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  successText: {
    backgroundColor: '#19873e',
    padding: 10,
    color: 'white',
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  }
});

export default Style;