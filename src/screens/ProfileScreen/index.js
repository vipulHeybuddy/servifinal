import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importing navigation hook

const ProfileScreen = () => {
  const navigation = useNavigation(); // Initializing navigation

  const handleSignOut = () => {
    // Perform sign-out logic here, such as clearing user session, etc.
    // Then navigate to the login screen
    navigation.navigate('Login'); // Assuming 'Login' is the name of your login screen route
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image source={{ uri: "https://github.com/josafamarengo.png" }} style={styles.profilePicture} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>John Doe</Text>
          <Text style={styles.profileText}>Email: johndoe@example.com</Text>
          <Text style={styles.profileText}>Phone: +1234567890</Text>
          <Text style={styles.profileText}>Location: City, Country</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          {/* Sign out button */}
          <TouchableOpacity style={[styles.editButton, styles.signOutButton]} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.preferences}>
        <Text style={styles.subheading}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Preferred Cuisine:</Text>
          <Text style={[styles.preferenceText, styles.preferenceValue]}>Italian</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Preferred Location:</Text>
          <Text style={[styles.preferenceText, styles.preferenceValue]}>Downtown</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Preferences</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.bookingHistory}>
        <Text style={styles.subheading}>Booking History</Text>
        <Text style={styles.bookingText}>
          Date: January 1, 2024 | Time: 7:00 PM | Restaurant: EL CABO Restaurant
        </Text>
        {/* More booking history items can be added dynamically */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  editButton: {
    backgroundColor: '#FDAC42',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  preferences: {
    alignItems: 'center',
    marginBottom: 20,
  },
  preferenceItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 16,
    marginRight: 10,
    color: '#333333',
  },
  preferenceValue: {
    fontWeight: 'bold',
  },
  bookingHistory: {
    marginBottom: 20,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  // Style for sign-out button
  signOutButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    color: 'black ',
    marginTop: 5, // Remove top margin to align with the "Edit Profile" button
  },
});

export default ProfileScreen;
