// components/InputChat.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

interface InputChatProps {
  mensaje: string;
  setMensaje: (texto: string) => void;
  onEnviar: () => void;
  cargando: boolean;
}

export default function InputChat({ mensaje, setMensaje, onEnviar, cargando }: InputChatProps) {
  return (
    <View className="bg-white border-t border-purple-200 px-4 py-3 flex-row items-end shadow-2xl">
      <View className="flex-1 bg-purple-50 rounded-3xl px-4 py-2 mr-2 border border-purple-200">
        <TextInput
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#c084fc"
          value={mensaje}
          onChangeText={setMensaje}
          multiline
          style={{ maxHeight: 100 }}
          className="text-gray-800 text-base"
          onSubmitEditing={onEnviar}
        />
      </View>
      
      <TouchableOpacity
        onPress={onEnviar}
        disabled={!mensaje.trim() || cargando}
        className={`w-12 h-12 rounded-full items-center justify-center shadow-md ${
          mensaje.trim() && !cargando ? 'bg-purple-500' : 'bg-gray-300'
        }`}
      >
        <Text className="text-xl">{mensaje.trim() && !cargando ? '💜' : '📩'}</Text>
      </TouchableOpacity>
    </View>
  );
}