import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, ScrollView, Modal, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the mic icon

import restaurants from '../../../assets/data/itrestaurants';
import categories from '../../../assets/data/categories';

import RestaurantItem from '../../components/RestaurantItem';
import Category from '../../components/Category';
import PromotionalBanner from '../../components/PromotionalBanner';
import Search from '../../components/Search';
import SearchScreen from '../SearchScreen';
import BookingScreen from '../BookigScreen';

export default function ItalianHome() {
    
  

  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  return (
    <>
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
      vertical
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: 10 , paddingTop: 50 }}
      >
        <PromotionalBanner img={restaurants[0].image} />
        <PromotionalBanner img={restaurants[1].image} />
      
      </ScrollView>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        Restaurants
      </Text>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      <Modal 
        visible={modalVisible} 
        transparent
        animationType="fade" // Add fade animation for a smoother transition
        onRequestClose={() => setModalVisible(false)} // Close modal when clicked outside
      >
        <TouchableOpacity 
          style={[styles.modalContainer, { justifyContent: 'center', alignItems: 'center' }]}
          activeOpacity={1} // Prevents touch events from passing through
          onPress={() => setModalVisible(false)} // Close modal when clicked outside
        >
          <View style={styles.modalContent}>
            <SearchScreen onPress={() => setModalVisible(false)} />
          </View>
        </TouchableOpacity>
      </Modal>
      </ScrollView>
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: 'orange' }]} // Orange background
        onPress={() => setBookingModalVisible(true)}
      >
        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
          <FontAwesome name="microphone" size={24} color="white" /> {/* Mic icon */}
        </Text>
      </TouchableOpacity>

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
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue', // Default background color, you can remove this
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%', 
    height: '100%',
    marginTop: 120,
    // Set a specific width for the modal content
    maxWidth: 300, // Limit the maximum width of the modal content
  },
  bookingModalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    marginTop: 220,
    padding: 20,
    elevation: 5,
    width: '80%', 
    height: '50%',
    // Set a specific width for the modal content
    maxWidth: 300, // Limit the maximum width of the modal content
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});
