import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
const commandActions = {
  "go to home": { type: "navigation", path: "Home" },
  "show me italian restaurants": { type: "navigation", path: "italian" },
  "show my orders": { type: "navigation", path: "Orders" },
  "show recent order details": { type: "navigation", path: "OrderDetails" },
  "go to cart": { type: "navigation", path: "Basket" },
  "go to profile": { type: "navigation", path: "Profile" },
  "open menu of el cabo": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 1 },
  },
  "open menu of first resturant": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 1 },
  },
  "open menu of tommy roma": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 2 },
  },
  "open menu of second restaurant": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 2 },
  },
  "open menu of brothers barbecue": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 3 },
  },
  "open menu of third restaurant": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 3 },
  },
  "open menu of hamburguesa nostra": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 4 },
  },
  "open menu of fourth resturant": {
    type: "navigation",
    path: "Restaurant",
    params: { id: 4 },
  },
  "i want to order cheesesteak": {
    type: "navigation",
    path: "Dish",
  },
  "i want to order cheese steak": {
    type: "navigation",
    path: "Dish",
  },
  "i want to order hamburger": {
    type: "navigation",
    path: "Dish",
  },
  "i want to order burger": {
    type: "navigation",
    path: "Dish",
  },
  "add to basket": {
    type: "navigation",
    path: "Basket",
  },

  "book a table": {
    type: "action",
    condition: "bookTable",
  },

  "open italian": {
    type: "navigation",
    path: "Home",
  },
  // "show italian food": {
  //   type: "navigation",
  //   path: "RestrauntScreen",
  // },
  // Add other commands as needed
};

const useVoiceCommands = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const processVoiceCommand = (voiceCommand) => {
    const command = voiceCommand
      .replace(/[^\w\s?]/gi, "")
      .trim()
      .toLowerCase();
    console.log(command);
    if (commandActions.hasOwnProperty(command)) {
      const action = commandActions[command];
      console.log(action, "table booking");
      switch (action.type) {
        case "navigation":
          console.log("action is", action);
          navigation.navigate(action.path, action?.params);
          break;
        case "action":
          if (action.condition == "bookTable") {
            Alert.alert("Success", "Table successfully booked!");
          }
          break;
        default:
          break;
      }
    } else {
      setError("Unknown command");
    }
  };

  return { error, processVoiceCommand };
};

export default useVoiceCommands;
