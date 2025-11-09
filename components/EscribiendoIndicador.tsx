import React from "react";
import { View } from "react-native";

export default function EscribiendoIndicador() {
  return (
    <View className="flex-row justify-start mb-3">
      <View className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-purple-100">
        <View className="flex-row space-x-1.5">
          <View className="w-2 h-2 bg-purple-400 rounded-full" />
          <View className="w-2 h-2 bg-pink-400 rounded-full" />
          <View className="w-2 h-2 bg-yellow-400 rounded-full" />
        </View>
      </View>
    </View>
  );
}