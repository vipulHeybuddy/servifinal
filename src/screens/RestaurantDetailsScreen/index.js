import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TimePickerAndroid,
  Platform,
  ActionSheetIOS,
} from "react-native";
import restaurants from "../../../assets/data/restaurants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import DishListItem from "../../components/DishListItem";
import Header from "./Header";
import { styles } from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the mic icon
import BookingScreen from '../BookigScreen';

const RestaurantDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { id , category } = route.params;
  let restaurant = restaurants.find((r) => r.id == id);
  
  // if(category){
  //  restaurant =  restaurant.find((r) => r.category == category)
  // }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleTimePicker = async () => {
    if (Platform.OS === "android") {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 12,
          minute: 0,
          is24Hour: false,
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          const selectedTime = `${hour}:${minute}`;
          setSelectedTime(selectedTime);
        }
      } catch ({ code, message }) {
        console.warn("Cannot open time picker", message);
      }
    }
  };

  const handleSelectNumberOfPeople = () => {
    const options = Array.from({ length: 8 }, (_, i) => `${i + 1}`);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, "Cancel"],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length) {
          setNumberOfPeople(parseInt(options[buttonIndex]));
        }
      }
    );
  };

  const handleSelectDate = () => {
    // Implement your custom date picker logic here
  };

  const handleSelectTime = () => {
    const timeOptions = ["4 PM", "7 PM", "8 PM", "Cancel"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: timeOptions,
        cancelButtonIndex: timeOptions.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== timeOptions.length - 1) {
          setSelectedTime(timeOptions[buttonIndex]);
        }
      }
    );
  };

  const handleSubmit = () => {
    Alert.alert("Success", "Table successfully booked!");
  };

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={restaurant.dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="chevron-back"
          size={30}
          color="#151515"
          style={styles.icon}
        />
        <TouchableOpacity onPress={toggleModal} style={styles.floatingButton1}>
          <MaterialCommunityIcons
            onPress={toggleModal}
            name="bell"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <Text style={styles.modalTitle}>Book a Seat</Text>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSelectNumberOfPeople}
              style={styles.input}
            >
              <Text>Number of People: {numberOfPeople}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectDate} style={styles.input}>
              <Text>{selectedDate ? `Selected Date: ${selectedDate}` : "Select Date"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectTime} style={styles.input}>
              <Text>{selectedTime ? `Selected Time: ${selectedTime}` : "Select Time"}</Text>
            </TouchableOpacity>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
      
      {/* <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: 'orange' }]} // Orange background
        onPress={() => setBookingModalVisible(true)}
      >
        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
          <FontAwesome name="microphone" size={24} color="white" /> 
        </Text>
      </TouchableOpacity> */}

      <Modal 
        visible={bookingModalVisible} 
        transparent
        animationType="fade" // Add fade animation for a smoother transition
        onRequestClose={() => setBookingModalVisible(false)}
      >
        <TouchableOpacity 
          style={[styles.modalContainer, { justifyContent: 'center', alignItems: 'center' }]}
          activeOpacity={1}
          onPress={() => setBookingModalVisible(false)}
        >
          <View style={styles.bookingModalContent}>
            <BookingScreen />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBookingModalVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};


export default RestaurantDetailsScreen;

