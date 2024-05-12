import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  tagline: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    color: "black",
  },
  inputContainer: {
    width: "80%",
  },
  inputLabel: {
    color: "black",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFF1EC",
  },
  loginButton: {
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
    backgroundColor:
      "linear-gradient(45deg, rgba(255,180,91,1) 0%, rgba(255,140,0,1) 100%)",
  },
  loginButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
   
  },
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
  },
  forgotPasswordText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    color: "white",
  },
  socialLoginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  socialLoginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  googleButton: {
    backgroundColor: "red",
  },
  appleButton: {
    backgroundColor: "black",
  },
  socialLoginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    width: "48%",
  },
  selectInput: {
    justifyContent: "center",
    marginBottom: 15,
  },
  dropdownContainer: {
    position: "absolute",
    top: 400,
    backgroundColor: "#444",
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownOption: {
    padding: 10,
  },
});
