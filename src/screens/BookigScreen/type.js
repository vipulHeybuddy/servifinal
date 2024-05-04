import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Speech from "expo-speech";

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (index < text.length) {
  //       setDisplayText((prevText) => prevText + text[index]);
  //       setIndex((prevIndex) => prevIndex + 1);
  //     } else {
  //       clearInterval(timer);
  //       // Speak the text once typewriting is complete
  //       console.log(text);
  //       speakText(text);
  //     }
  //   }, 50);

  //   return () => clearInterval(timer);
  // }, [index, text]);

  const speakText = (text) => {
    console.log("Speaking text:", text);
    Speech.speak(text);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (index < text?.length) {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(timer);
      }
    }, 50);
  
    return () => clearInterval(timer);
  }, [index, text]);

  useEffect(() => {
    if (index === text?.length) {
      speakText(text);
    }
  }, [ text]);

  return <Text style={{color: 'white'}}>{displayText}</Text>; // Ensure text is rendered within a <Text> component
};

export default TypewriterText;