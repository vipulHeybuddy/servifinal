import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";
// import logo from "../../../assets/logo.png";


export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const requestBody = {
      email: email,
      password: password,
    };

    fetch("https://serviai.azurewebsites.net/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.msg);
        if (data.data.sucess === false) {
          Alert.alert("Login Failed", data.data.msg);
        } else {
          Alert.alert("Login Successful", "You have successfully logged in!");
          //   router.push('/home/HomeScreen')
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={logo}
        style={styles.logo}
      /> */}
      <Text style={styles.appName}>SERVI!</Text>
      <Text style={styles.tagline}>A REVOLUTION IN DINING</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don't have an account? Register now{" "}
        </Text>
      </View>

      <View style={styles.socialLoginContainer}>

        <TouchableOpacity
          style={[styles.socialLoginButton, styles.googleButton]}
        >
          {/* <Image
            source={require("./google.png")}
            style={styles.socialLoginLogo}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialLoginButton, styles.appleButton]}
        >
          {/* <Image
            source={require("../../../assets/Apple.png")}
            style={styles.socialLoginLogo}
          /> */}

        </TouchableOpacity>
      </View>
    </View>
  );
}
