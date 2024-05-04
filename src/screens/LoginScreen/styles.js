
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2D273F',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  tagline: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    width: '80%',
  },
  inputLabel: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
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
    color: 'white',
  },
  forgotPasswordText: {
    marginTop: 3,
    marginBottom: 20,
    textAlign: 'right',
    color: 'white',
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