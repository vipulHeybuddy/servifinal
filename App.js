import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import useVoiceRecognition from "./src/hooks/useVoiceRecognition";
import useVoiceCommands from "./src/hooks/useVoiceCommands";


export default function App() {
  const { startRecording, stopRecording, isRecording, resultSpeech } =
    useVoiceRecognition();
    const { error, processVoiceCommand } = useVoiceCommands();
    const [conversation, setConversation] = useState([]);

  const [recordingResult, setRecordingResult] = useState("");

  const handleMicPressIn = () => {
    startRecording();
  };

  const handleMicPressOut = () => {
    stopRecording();
    setRecordingResult(resultSpeech);
    handleQuerySubmit(resultSpeech);
    
  };


  const handleQuerySubmit = async (query) => {
    try {
      const requestBody = {
        // attachments: [],
        // channel: "dashboard",
        // conversationId: "clvi1bolz000m356vwathvnn6",
        // query: query,
        // streaming: false,
        // visitorId: "clvdsn5wm1nqa8io935om3cpn",
        attachments: [],
          channel: "dashboard",
          conversationId: "clvpbcwav000o356x916p2ft6",
          query: query,
          streaming: false,
          visitorId: "clvpbcwzg3bpz8iq0267z0j74",
      };

      const response = await fetch(
        "https://app.chaindesk.ai/api/agents/clvpbcsmk077so98i7rs9ubck/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 1738fc43-25a5-4877-94ab-b61a8c771adf",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();
      setConversation((prevConversation) => [
        ...prevConversation,
        { message: query, isUser: true },
        { message: responseData.answer, isUser: false },
      ]);
      processVoiceCommand(query);
      await speakResponse(responseData.answer);
      //
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", error);
    }
    
  };

  const speakResponse = async (response) => {
    const filteredResponse = response.replace(/[\uD800-\uDFFF]./g, "");
    Speech.speak(filteredResponse);
  };

  // Function to update query state with the result from VoiceRecog
  const updateQueryFromVoice = (result) => {
    setQuery(result);
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
            Recording Result: {resultSpeech}
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
