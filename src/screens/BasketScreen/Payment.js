import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const Payment = () => {
  const [name, setName] = useState("");
  const stripe = useStripe();
  const [amount, setAmount] = useState(0);
  const windowHeight = useWindowDimensions().height;
  const subscribe = async () => {
    try {
      const response = await fetch("https://serviai.azurewebsites.net/pay", {
        method: "POST",
        body: JSON.stringify({ amount, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Merchant Name",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View style={{ ...styles.container, minHeight: Math.round(windowHeight) }}>
      <TextInput
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={styles.inputStyle}
      />
      <TextInput
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
        placeholder="Amount"
        style={styles.inputStyle}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={subscribe}>
        <Text style={styles.btnText}> {`Pay - ${amount} INR`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  inputStyle: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 8,
    elevation: 10,
  },

  submitBtn: {
    backgroundColor: "#1A1A23",
    padding: 20,
    width: "50%",
    alignItems: "center",
    marginTop: "20%",
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
