import { useState } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import useVoiceCommands from "./useVoiceCommands";
import * as FileSystem from "expo-file-system";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Alert, Animated } from "react-native";
import * as Speech from "expo-speech";


const useVoiceRecognition = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [resultSpeech, setResultSpeech] = useState("");
  const { error, processVoiceCommand } = useVoiceCommands();
  const [responseAnswer, setResponseAnswer] = useState("");
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const recordingOptions = {
          android: {
            extension: ".wav",
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_PCM,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM,
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };
        setIsRecording(true);
        const { recording } = await Audio.Recording.createAsync(
          recordingOptions
        );
        setRecording(recording);
      } else {
        console.error("Permission not granted");
      }
    } catch (err) {
      console.error("Accessibility failed", err);
    }
  }

  // async function stopRecording() {
  //   try {
  //     setRecording(undefined);
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: false,
  //     });
  //     await recording?.stopAndUnloadAsync();
  //     const fileUri = `${FileSystem.documentDirectory}recording${Date.now()}.wav`;
  //     await FileSystem.copyAsync({
  //       from: recording?.getURI(),
  //       to: fileUri,
  //     });
  //    const result =  await translateSpeechToText(fileUri);
  //    setIsRecording(false);
  //    handleQuerySubmit(result);
      
  //   } catch (error) {
  //     console.error("Error while stopping recording:", error);
  //   }
  // }
  async function stopRecording() {
    try {
      if (!recording) {
        console.warn("No recording available to stop.");
        return;
      }
  
      await recording.stopAndUnloadAsync();
  
      const fileUri = `${FileSystem.documentDirectory}recording${Date.now()}.wav`;
      await FileSystem.moveAsync({
        from: recording.getURI(),
        to: fileUri,
      });
  
      const result = await translateSpeechToText(fileUri);
      setIsRecording(false);
      handleQuerySubmit(result);
    } catch (error) {
      console.error("Error while stopping recording:", error);
    }
  }
  

  const handleQuerySubmit = async (query) => {
    try {
      const requestBody = {
        query: query,
        visitorId: "clvdsn5wm1nqa8io935om3cpn",
        conversationId: "clvw8stys000o356uzduzsprx",
        channel: "dashboard",
        attachments: [],
        streaming: false,
      };

      const response = await fetch(
        "https://app.chaindesk.ai/api/agents/clvw8skup084eq08ivej1m988/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ",
          },
          body: JSON.stringify(requestBody),
        }
      );
      //0ff4bac5-cd99-434e-ab5d-f408c11759f3

      const responseData = await response.json();
      console.log(" hell1" ,responseData);
      console.log("hell2", query)
       processVoiceCommand(query);
       await speakResponse(responseData.answer);
       setResponseAnswer(responseData.answer); // Set response answer to state
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  };

  const speakResponse = async (response) => {
    const filteredResponse = response.replace(/[\uD800-\uDFFF]./g, "");
    Speech.speak(filteredResponse);
  };

  async function translateSpeechToText(fileUri) {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: "audio/x-wav",
        name: "audio.wav",
      });
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer ",
          },
        }
      );
      //sk-proj-rtw5oP2UyhV3cjbFoc5lT3BlbkFJs6SjUUGjILJx50mOxmwk
      const transcribedText = response.data;
      setResultSpeech(transcribedText);
      
      return transcribedText;

    } catch (error) {
      console.error("Transcription failed", error);
    } finally {
      try {
        await FileSystem.deleteAsync(fileUri);
        console.log(`File ${fileUri} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete file ${fileUri}: ${error.message}`);
      }
    }
  }
  

  return {
    startRecording,
    stopRecording,
    isRecording,
    resultSpeech,
    responseAnswer
  };
};

export default useVoiceRecognition;
