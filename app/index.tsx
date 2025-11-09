import "../global.css";
import React, { useState, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHeader from "../components/ChatHeader";
import MensajeBurbuja from "../components/mensajeBurbuja";
import EscribiendoIndicador from "../components/EscribiendoIndicador";
import InputChat from "../components/InputChat";
import MensajeVacio from "../components/MensajeVacio";
import { Mensaje } from "../types/chat.types";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

export default function App() {
  const [mensaje, setMensaje] = useState<string>("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const consultarGemini = async (pregunta: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const result = await model.generateContent(pregunta);
      const response = await result.response;
      const text = response.text();
      
      const mensajeIA: Mensaje = {
        id: Date.now() + 1,
        texto: text || "No se pudo obtener la respuesta",
        esUsuario: false,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMensajes(prev => [...prev, mensajeIA]);
      
    } catch (err) {
      console.log(err);
      const mensajeError: Mensaje = {
        id: Date.now() + 1,
        texto: "Lo siento, ocurrió un error 😔",
        esUsuario: false,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMensajes(prev => [...prev, mensajeError]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const enviarMensaje = async (): Promise<void> => {
    if (!mensaje.trim()) return;

    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now(),
      texto: mensaje,
      esUsuario: true,
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMensajes(prev => [...prev, nuevoMensajeUsuario]);
    const preguntaActual = mensaje;
    setMensaje("");
    
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    await consultarGemini(preguntaActual);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-purple-50"
    >
      <ChatHeader />

      <ScrollView 
        ref={scrollRef}
        className="flex-1 px-4 py-3"
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {mensajes.length === 0 && <MensajeVacio />}

        {mensajes.map((msg) => (
          <MensajeBurbuja key={msg.id} mensaje={msg} />
        ))}

        {isLoading && <EscribiendoIndicador />}
      </ScrollView>

      <InputChat 
        mensaje={mensaje}
        setMensaje={setMensaje}
        onEnviar={enviarMensaje}
        cargando={isLoading}
      />
    </KeyboardAvoidingView>
  );
}