import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Mic from "./src/components/Mic";

export default function Navigate() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showMic, setShowMic] = useState(false);
  
  useEffect(() => {
    const currentScreen = navigation?.getCurrentRoute()?.name;
    const screensToShowMic = ["Home", "Início", "Basket", "Profile"];
    setShowMic(isFocused && screensToShowMic.includes(currentScreen));
  }, [navigation, isFocused]);

  return (
    <>
      {showMic && <Mic />}
    </>         
  );
}
