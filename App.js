import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import useVoiceRecognition from "./src/hooks/useVoiceRecognition";

export default function App() {
  const { startRecording, stopRecording, isRecording, resultSpeech } =
    useVoiceRecognition();
  const [recordingResult, setRecordingResult] = useState("");

  const handleMicPressIn = () => {
    startRecording();
  };

  const handleMicPressOut = () => {
    stopRecording();
    setRecordingResult(resultSpeech);
  };

  console.log("voice result", resultSpeech);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
        <StatusBar style="auto" />
        <TouchableWithoutFeedback
          onPressIn={handleMicPressIn}
          onPressOut={handleMicPressOut}
        >
          <View
            style={[
              styles.microphoneButton,
              { backgroundColor: isRecording ? "blue" : "orange" }, // Change button color when recording
            ]}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              <FontAwesome name="microphone" size={24} color="white" />
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Recording Result: {recordingResult}
          </Text>
        </View>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  microphoneButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
  },
  resultContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
  },
});
