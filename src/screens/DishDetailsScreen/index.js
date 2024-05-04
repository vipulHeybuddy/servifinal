import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import restaurants from "../../../assets/data/restaurants.json";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatValue } from "../../utils/formatValues";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for the mic icon
import BookingScreen from "../BookigScreen";

const dish = restaurants[0].dishes[0];


const DishDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: dish.image }} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Text style={styles.price}>{formatValue(dish.price)}</Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <View style={styles.quantityGroup}>
          <AntDesign
            name="minuscircleo"
            size={30}
            color="black"
            onPress={onMinus}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <AntDesign
            name="pluscircleo"
            size={30}
            color="black"
            onPress={onPlus}
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add to Basket {getTotalPrice()}</Text>
        </Pressable>
      </View>

      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: "orange" }]} // Orange background
        onPress={() => setBookingModalVisible(true)}
      >
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          <FontAwesome name="microphone" size={24} color="white" />{" "}
          {/* Mic icon */}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={bookingModalVisible}
        transparent
        animationType="fade" // Add fade animation for a smoother transition
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <TouchableOpacity
          style={[
            styles.modalContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
          activeOpacity={1}
          onPress={() => setBookingModalVisible(false)}
        >
          <View style={styles.bookingModalContent}>
            <BookingScreen />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBookingModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6e6969",
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e2e2e2",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  quantityGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "#e47911",
    paddingVertical: 20,
    width: "60%",
    alignItems: "center",
    marginTop: "auto",
    alignSelf: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 190,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "blue", // Default background color, you can remove this
    justifyContent: "center",
    
    elevation: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    height: "100%",
    marginTop: 120,
    // Set a specific width for the modal content
    maxWidth: 300, // Limit the maximum width of the modal content
  },
  bookingModalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    marginTop: 220,
    padding: 20,
    elevation: 5,
    width: "80%",
    height: "50%",
    // Set a specific width for the modal content
    maxWidth: 300, // Limit the maximum width of the modal content
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default DishDetailsScreen;

