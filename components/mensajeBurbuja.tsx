import React from "react";
import { View, Text } from "react-native";
import { Mensaje } from "../types/chat.types";

interface MensajeBurbujaProps {
  mensaje: Mensaje;
}

export default function MensajeBurbuja({ mensaje }: MensajeBurbujaProps) {
  return (
    <View
      className={`flex-row mb-3 ${mensaje.esUsuario ? 'justify-end' : 'justify-start'}`}
    >
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          mensaje.esUsuario
            ? 'bg-purple-500 rounded-br-sm'
            : 'bg-white rounded-bl-sm shadow-md border border-purple-100'
        }`}
      >
        <Text className={`text-base ${mensaje.esUsuario ? 'text-white' : 'text-gray-800'}`}>
          {mensaje.texto}
        </Text>
        <Text className={`text-xs mt-1 ${mensaje.esUsuario ? 'text-purple-200' : 'text-gray-400'} text-right`}>
          {mensaje.hora}
        </Text>
      </View>
    </View>
  );
}