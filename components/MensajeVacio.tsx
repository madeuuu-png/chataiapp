import React from "react";
import { View, Text } from "react-native";

export default function MensajeVacio() {
  return (
    <View className="flex-1 items-center justify-center mt-20 px-8">
      <Text className="text-7xl mb-4">🌸</Text>
      <Text className="text-purple-500 text-center text-lg font-semibold mb-2">
        ¡Hola! Soy tu asistente mágico
      </Text>
      <Text className="text-purple-400 text-center text-base">
        Pregúntame lo que quieras ✨
      </Text>
    </View>
  );
}