// useVoiceCommands.js
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

const commandActions = {
  "go to home": { type: "navigation", path: "ProfileScreen" },
  "go to explore": { type: "navigation", path: "HomeScreen" },
  "go to community": { type: "navigation", path: "CommunityScreen" },
  "go to bookings": { type: "navigation", path: "BookingScreen" },
  "show italian food": {
    type: "navigation",
    path: "RestrauntScreen",
  },
  // Add other commands as needed
};

const useVoiceCommands = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const processVoiceCommand = (voiceCommand) => {
    const command = voiceCommand.toLowerCase();
    if (commandActions.hasOwnProperty(command)) {
      const action = commandActions[command];
      switch (action.type) {
        case "navigation":
          navigation.navigate(action.path);
          break;
        case "action":
          // Handle actions if needed
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
