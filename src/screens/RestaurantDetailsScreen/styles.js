import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 1,
    marginTop: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    margin: 10,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  menuTitle: {
    fontSize: 16,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontWeight: "300",
    marginTop: 20,
    marginLeft: 10,
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  floatingButton: {
    position: 'absolute',
    top: 700,
    left: 320,
    backgroundColor: '#e47911',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
   elevation: 15,
  },

  floatingButton1: {
    position: 'absolute',
    top: 600,
    left: 310,
    backgroundColor: '#e47911',
    width: 60,
    height: 60,
    borderRadius: 30,
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