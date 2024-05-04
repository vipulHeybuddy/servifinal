import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable ,Linking , Alert, Platform} from "react-native";
import {
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import restaurants from "../../../assets/data/restaurants.json";
import BasketItem from "../../components/BasketItem";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import {StripeProvider , useStripe} from '@stripe/stripe-react-native';
import * as Location from 'expo-location';





const restaurant = restaurants[0];


const BasketScreen = () => {

  const stripe = useStripe();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const windowHeight = useWindowDimensions().height;

  const onMinus = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotalPrice = () => {
    return (quantity * dish.price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const navigation = useNavigation();
  const goBack = () => navigation.navigate("Restaurant", { id: restaurant.id });

 
  const subscribe = async () => {
    try {
      const response = await fetch("https://serviai.azurewebsites.net/pay", {
        method: "POST",
        body: JSON.stringify({ amount: '50', name: 'servi' }),
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
      handleOpenMaps();
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  const handleOpenMaps = async () => {
    let destination = '601 Mission Bay Blvd N San Francisco, CA 94158 United States'; // Example destination
    let mapsUrl;

    if (Platform.OS === 'ios') {
      // Get current location coordinates
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          // Construct the URL for opening Apple Maps with directions
          mapsUrl = `http://maps.apple.com/?daddr=${destination}&saddr=${latitude},${longitude}&dirflg=d`;
        }
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    } else {
      // For non-iOS platforms, fall back to opening Google Maps
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&dirflg=d&mode=driving`;
    }

    if (mapsUrl) {
      // Open the URL in the device's default browser
      Linking.openURL(mapsUrl);
    } else {
      console.error('Unable to construct maps URL.');
    }
  };
  const initiateCheckout = async (sessionId) => {
    try {
        console.log(sessionId)
       
        await stripe.init({
            publishableKey: 'pk_test_51Os3F2CD0ei4ahq5yFvXcZDEtmhdODfvVv61n2b64ecBjRvK4uyrxn4z7jBcZsjHIvRb1QvJiRZfuOizBCqzLMlM001EmC8MmX',
        });

        // Redirect to checkout page using session ID
        const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });

        if (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
  return (
    <StripeProvider
        publishableKey="pk_test_51Os3F2CD0ei4ahq5yFvXcZDEtmhdODfvVv61n2b64ecBjRvK4uyrxn4z7jBcZsjHIvRb1QvJiRZfuOizBCqzLMlM001EmC8MmX"
      >
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <Text style={styles.subtitle}>Your Orders</Text>

      <Text style={styles.separator} />

      <FlatList
        data={restaurant.dishes}
        renderItem={({ item }) => <BasketItem basketDish={item} />}
        style={{ marginBottom: 10 }}
      />

      <View style={styles.separator} />

      <View style={styles.row}>
        <Pressable
          style={styles.buttonBack}
          onPress={goBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      
        <View style={styles.button}>
        <Pressable onPress={subscribe}>
          <Text style={styles.buttonText}>Complete Purchase</Text>
          </Pressable>
        </View>
      
      </View>
    </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6e6969",
    marginVertical: 10,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e2e2e2",
  },
  button: {
    backgroundColor: "#e47911",
    paddingVertical: 14,
    width: "66%",
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonBack: {
    backgroundColor: "#252525",
    paddingVertical: 14,
    width: "30%",
    borderRadius: 4,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});

export default BasketScreen;

 
// import { useStripe } from "@stripe/stripe-react-native";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
// } from "react-native";

// const Payment = () => {
//   const [name, setName] = useState("");
//   const stripe = useStripe();
//   const [amount, setAmount] = useState(0);
//   const windowHeight = useWindowDimensions().height;
//   const subscribe = async () => {
//     try {
//       const response = await fetch("https://serviai.azurewebsites.net/pay", {
//         method: "POST",
//         body: JSON.stringify({ amount, name }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       if (!response.ok) return Alert.alert(data.message);
//       const clientSecret = data.clientSecret;
//       const initSheet = await stripe.initPaymentSheet({
//         paymentIntentClientSecret: clientSecret,
//         merchantDisplayName: "Merchant Name",
//       });
//       if (initSheet.error) return Alert.alert(initSheet.error.message);
//       const presentSheet = await stripe.presentPaymentSheet({
//         clientSecret,
//       });
//       if (presentSheet.error) return Alert.alert(presentSheet.error.message);
//       Alert.alert("Payment complete, thank you!");
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Something went wrong, try again later!");
//     }
//   };

//   return (
//     <View style={{ ...styles.container, minHeight: Math.round(windowHeight) }}>
//       <TextInput
//         onChangeText={(text) => setName(text)}
//         placeholder="Name"
//         style={styles.inputStyle}
//       />
//       <TextInput
//         keyboardType="numeric"
//         onChangeText={(value) => setAmount(value)}
//         placeholder="Amount"
//         style={styles.inputStyle}
//       />

//       <TouchableOpacity style={styles.submitBtn} onPress={subscribe}>
//         <Text style={styles.btnText}> {`Pay - ${amount} INR`}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Payment;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 20,
//   },
//   inputStyle: {
//     backgroundColor: "#fff",
//     width: "90%",
//     padding: 10,
//     borderRadius: 8,
//     elevation: 10,
//   },

//   submitBtn: {
//     backgroundColor: "#1A1A23",
//     padding: 20,
//     width: "50%",
//     alignItems: "center",
//     marginTop: "20%",
//     borderRadius: 20,
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 20,
//   },
// }); 
