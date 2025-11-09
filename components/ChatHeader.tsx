import React from "react";
import { View, Text } from "react-native";

export default function ChatHeader() {
  return (
    <View className="bg-purple-600 pt-12 pb-4 px-4 shadow-lg">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-yellow-300 items-center justify-center mr-3">
          <Text className="text-2xl">✨</Text>
        </View>
        <View>
          <Text className="text-white text-xl font-bold">Gemini AI</Text>
          <Text className="text-purple-200 text-xs">En línea</Text>
        </View>
      </View>
    </View>
  );
}