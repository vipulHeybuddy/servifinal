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
// import logo from "../../../assets/onboard.png";


export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

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
      source="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"
      style={styles.logo}
      /> */}
      <Image 
        style={[styles.logo, { width: 100, height: 100 }]} 
        source={{ uri: "https://s3-alpha-sig.figma.com/img/5ee4/c9a0/65a2f44cc82c98dac78ee437478e09f6?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XSr4RbHuuzm2a67Fvd2TVE2YMNxB3KJC7gfjLafN0SxRduwsjcdfm5bPyBlilNZVD4Xsxuysl8o~2GRH~NIk639RslJks0KXgxn42JBlRAGY4VCKml2c0ywBE32JbsOBWvK-u-SYYWR6dpqZVJK18-aU3fvskl~BQUghSTeJH4I1X~s00cWslfx4tv8Ax8-SeXVUtNOx47gXuYk0k2pPc-7Qm-CL5X5~xoJKZCSxuUoIyr5NM57v47OmwBcwHBa70X7q-kb6l-SUI9mlnB1u0d8nV28iCnQtGfWIaeRv~suF34G-gsmjFR3BCJUg4h2vIWcaRvoTHHSFJjqUs8qgRQ__" }} 
        resizeMode="contain"
      />
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
    Don't have an account? {" "}
    <TouchableOpacity onPress={handleRegister}>
      <Text style={{ color: '#FDAC42', paddingTop: '40' }}>Register now</Text>
    </TouchableOpacity>
  </Text>

      </View>

      <View style={styles.socialLoginContainer}>

        <TouchableOpacity
          style={[styles.socialLoginButton, styles.googleButton]}
        >
          <Image
          source={{ uri: "https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png" }}             
          style={[styles.socialLoginLogo, { width: 25, height: 25 , marginTop: 4, }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialLoginButton, styles.appleButton]}
        >
          <Image
            source={{ uri: "https://www.freeiconspng.com/uploads/apple-icon-4.png" }} 
            style={[styles.socialLoginLogo, { width: 42, height: 42 , }]} 
          />

        </TouchableOpacity>
      </View>
    </View>
  );
}
