
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDAC42'
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#FDAC42',
  },
  tagline: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'normal',
    marginBottom: 20,
    color: '#FDAC42',
  },
  inputContainer: {
    width: '80%',
  },
  inputLabel: {
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#FFF1EC',
  },
  loginButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    backgroundColor: 'linear-gradient(45deg, rgba(255,180,91,1) 0%, rgba(255,140,0,1) 100%)',
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#8174AA',
  },
  forgotPasswordText: {
    marginTop: 3,
    marginBottom: 20,
    textAlign: 'right',
    color: '#FDAC42',
  },
  socialLoginContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
 
  socialLoginButton: {
    paddingHorizontal: 10, // Adjust the padding here
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  googleButton: {
    backgroundColor: 'white', // White background
    width: '15%', // Adjust the width here
    marginRight: 4
  },
  appleButton: {
    backgroundColor: 'white', // White background
    width: '15%', // Adjust the width here
    marginLeft: 4
  },
  socialLoginLogo: {
    width: 20, // Adjust the size of the logo as needed
    height: 20,
  },
});