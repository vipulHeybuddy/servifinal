import { FlatList, StyleSheet, Text, ScrollView, Modal, View, TouchableOpacity } from 'react-native';
import orders from '../../../assets/data/orders.json';
import React, { useState } from 'react';
import BookingScreen from '../BookigScreen';
import OrderListItem from '../../components/OrderListItem';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the mic icon


const OrdersScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  return (
    <View>
      <Text style={{marginLeft: 10, fontWeight: 'bold', marginTop: 24}}>History</Text>
        <FlatList 
          data={orders}
          renderItem={({ item }) => <OrderListItem order={item} />}
        />

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
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 2,
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


export default OrdersScreen;