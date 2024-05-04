import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import TypewriterText from "./type";
import VoiceRecog from "./VoiceRecog";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons library for arrow icon
import { router } from "expo-router";
import useVoiceCommands from "../../hooks/useVoiceCommands";


const Message = ({ message, isUser, isResponse }) => {
  return (
    <View
      style={{
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        marginVertical: 5,
      }}
    >
      <View
        style={{
          backgroundColor: isUser ? "#FFF1EC" : "#FDAC42",
          borderRadius: 10,
          padding: 10,
          maxWidth: "70%",
          color: "white",
        }}
      >
        <Text>{isResponse ? <TypewriterText text={message} /> : message}</Text>
      </View>
    </View>
  );
};

const BookingScreen = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [resultSpeech, setResultSpeech] = useState("");
  const { error, processVoiceCommand } = useVoiceCommands();

  const handleQuerySubmit = async () => {
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
    setQuery("");
  };

  const speakResponse = async (response) => {
    const filteredResponse = response.replace(/[\uD800-\uDFFF]./g, "");
    Speech.speak(filteredResponse);
  };

  // Function to update query state with the result from VoiceRecog
  const updateQueryFromVoice = (result) => {
    setQuery(result);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "black",
          paddingTop: 10,
        }}
      >
        SERVI AI
      </Text>
      <ScrollView
        style={{ flex: 1, padding: 10, marginBottom: 5 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        {conversation.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            isUser={message.isUser}
            isResponse={!message.isUser} // Determine if it's a response
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: "50%",
              borderRadius: 10,
            }}
            onChangeText={(text) => setQuery(text)}
            value={query}
            placeholder="Enter your query"
          />

          <TouchableOpacity onPress={handleQuerySubmit}>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <VoiceRecog
          style={{ marginLeft: "10%" }}
          onvoicechange={(data) => {
            setQuery(data);
          }}
        />
      </View>
    </View>
  );
};

export default BookingScreen;

