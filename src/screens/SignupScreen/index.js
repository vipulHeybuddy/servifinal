import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Link, router } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const placeholderColor = "rgba(129, 116, 170, 0.5)";
const labelColor = "rgba(129, 116, 170, 1)";
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male"); // Default to Male, change as needed
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [genderData, setGenderData] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

  const toggleGenderOptions = () => {
    setShowGenderOptions(!showGenderOptions);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    toggleGenderOptions();
  };

  const handleRegister = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Alert.alert("Error", "Please fill in all fields.");
    } else {
      fetch(
        `https://serviai.azurewebsites.net/user/otp?email=${encodeURIComponent(
          email
        )}`
      )
        .then((response) => {
          if (response.ok) {
            console.log("okay h sb kuch");
            // Proceed to OTP modal
            router.push({
              pathname: "/otp/OtpModal",
              params: {
                fname: firstName,
                lname: lastName,
                email: email,
                gender: gender,
                password: password,
                confirmPassword: confirmPassword,
              },
            });
          } else {
            throw new Error("Failed to fetch OTP");
          }
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to fetch OTP");
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.appName, { color: "#fff" }]}>Registration</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: labelColor }]}>Name</Text>
        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholderTextColor={placeholderColor}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholderTextColor={placeholderColor}
          />
        </View>
        <Text style={[styles.inputLabel, { color: labelColor }]}>Email</Text>
        <TextInput
          style={[styles.input, { color: "#fff" }]}
          placeholder="Enter your email address "
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={placeholderColor}
        />
        <Text style={[styles.inputLabel, { color: labelColor }]}>Password</Text>
        <TextInput
          style={[styles.input, { color: "#fff" }]}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={placeholderColor}
        />
        <Text style={[styles.inputLabel, { color: labelColor }]}>
          Confirm Password
        </Text>
        <TextInput
          style={[styles.input, { color: "#fff" }]}
          placeholder="Enter password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={placeholderColor}
        />

        <Text style={[styles.inputLabel, { color: labelColor }]}>Gender</Text>
        <DropDownPicker
          open={open}
          value={gender}
          items={genderData}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setGenderData}
          placeholder={"Select"}
          style={{
            backgroundColor: "rgba(129, 116, 170, 0.5)",
            borderColor: "rgba(90, 78, 126, 1)",
          }}
          textStyle={{
            fontSize: 15,
            color: "rgba(129, 116, 170, 0.5)",
          }}
          dropDownContainerStyle={{
            backgroundColor: `white`,
          }}
        />

        {/* <TouchableOpacity
          style={[styles.input, styles.selectInput]}
          onPress={toggleGenderOptions}
        ></TouchableOpacity>
        {showGenderOptions && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectGender("Male")}
            >
              <Text style={{ color: "#fff" }}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectGender("Female")}
            >
              <Text style={{ color: "#fff" }}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectGender("Others")}
            >
              <Text style={{ color: "#fff" }}>Others</Text>
            </TouchableOpacity>
          </View>
        )} */}

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Already have an account?
          <Link href="loginpage/LoginScreen"> Login</Link>
        </Text>
      </View>
    </View>
  );
}