import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Modal, Text, StyleSheet, TextInput, Button, Alert, DatePickerIOS, TimePickerAndroid, Platform, ActionSheetIOS } from 'react-native';
import restaurants from '../../../assets/data/restaurants';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import DishListItem from '../../components/DishListItem';
import Header from './Header';
import { styles } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';

const RestaurantDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const { id } = route.params;
  const restaurant = restaurants.find((r) => r.id === id);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleTimePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 12,
          minute: 0,
          is24Hour: false,
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          const selectedTime = `${hour}:${minute}`;
          setTime(selectedTime);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
      }
    }
  };

  const handleSelectNumberOfPeople = () => {
    const options = Array.from({ length: 8 }, (_, i) => `${i + 1}`);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, 'Cancel'],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length) {
          setNumberOfPeople(parseInt(options[buttonIndex]));
        }
      }
    );
  };

  const handleSelectTime = () => {
    const timeOptions = ['4 PM', '7 PM', '8 PM', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: timeOptions,
        cancelButtonIndex: timeOptions.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== timeOptions.length - 1) {
          setTime(timeOptions[buttonIndex]);
        }
      }
    );
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Table successfully booked!');
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
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.floatingButton}
        >
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
            {Platform.OS === 'ios' ? (
              <DatePickerIOS
                date={date}
                onDateChange={setDate}
                mode="date"
                style={styles.input}
              />
            ) : null}
            <TouchableOpacity
              onPress={handleSelectTime}
              style={styles.input}
            >
              <Text>{time ? `Selected Time: ${time}` : 'Select Time'}</Text>
            </TouchableOpacity>
            <Button
              title="Submit"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RestaurantDetailsScreen;
