import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Alert, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useVoiceCommands from "../../hooks/useVoiceCommands";
import useVoiceRecognition from "../../hooks/useVoiceRecognition";
import * as Speech from "expo-speech";

const Mic = () => {
  const { startRecording, stopRecording, isRecording, resultSpeech, responseAnswer } = useVoiceRecognition();
  const { error, processVoiceCommand } = useVoiceCommands();
  const [showResult, setShowResult] = useState(false); // Initially set to false
  const animationValue = useRef(new Animated.Value(0)).current;

  const handleMicPressIn = () => {
    setShowResult(false);
    startRecording();
    animateMicButton(1); // Start animation when pressing the mic button
  };

  const handleMicPressOut = () => {
    stopRecording();
    setTimeout(() => {
      setShowResult(true); // Hide result after a few seconds
    }, 6000);

    animateMicButton(0); // Stop animation when releasing the mic button
    setTimeout(() => {
      setShowResult(false); // Hide result after a few seconds
    }, 12000); // Adjust the duration as needed (3000 milliseconds = 3 seconds)
  };

  const animateMicButton = (toValue) => {
    Animated.timing(animationValue, {
      toValue: toValue,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  const micButtonScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], 
  });

  return (
    <>
      <TouchableWithoutFeedback
        onPressIn={handleMicPressIn}
        onPressOut={handleMicPressOut}
      >
        <Animated.View
          style={[
            styles.microphoneButton,
            { backgroundColor: isRecording ? "blue" : "orange", transform: [{ scale: micButtonScale }] }, // Apply animation to scale
          ]}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            <FontAwesome name="microphone" size={24} color="white" />
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {showResult && (
        <View style={styles.resultContainer}>
          <View style={styles.resultBackground}>
            <Text style={styles.resultText}>{responseAnswer}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  microphoneButton: {
    position: "absolute",
    bottom: 45,
    alignSelf: "center", // Center horizontally
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
  },
  resultContainer: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    zIndex: 1, 
  },
  resultBackground: {
    backgroundColor: "rgba(128, 128, 128, 0.9)",
    padding: 10,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 18,
    color: "white",
  },
});

export default Mic;
