import { useState } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const useVoiceRecognition = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [resultSpeech, setResultSpeech] = useState("");

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

  async function stopRecording() {
    setRecording(undefined);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    await recording?.stopAndUnloadAsync();
    const fileUri = `${FileSystem.documentDirectory}recording${Date.now()}.wav`;
    await FileSystem.copyAsync({
      from: recording?.getURI(),
      to: fileUri,
    });
    await translateSpeechToText(fileUri);
    setIsRecording(false);
  }

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
            Authorization:
              "Bearer sk-proj-77qF1V4hLr9eJUeSDzPRT3BlbkFJSmVdqa6ehgsDlpPGHrv0",
          },
        }
      );
      const resultSpeech = response.data;
      setResultSpeech(resultSpeech);
    } catch (error) {
      console.error("Transcription failed", error);
    }
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log(`File ${fileUri} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete file ${fileUri}: ${error.message}`);
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    resultSpeech,
  };
};

export default useVoiceRecognition;
