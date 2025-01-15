import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from "@/Context/Zustand";
import { toast } from 'sonner';

export const useSpeechRecognition = (onFinalTranscript) => {
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const updateConversation = useAppStore((state) => state.updateConversation);
  const setUserResponse = useAppStore((state) => state.setUserResponse);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      synthRef.current = window.speechSynthesis;
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const startListening = useCallback(() => {
    let accumulatedTranscript = "";

    recognitionRef.current.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        accumulatedTranscript += result[0]?.transcript.trim() + " ";
      }
      updateConversation(accumulatedTranscript, "Dispatcher");
    };

    recognitionRef.current.onend = () => {
      if (accumulatedTranscript) {
        setUserResponse(accumulatedTranscript);
        updateConversation(accumulatedTranscript, "Dispatcher");
        onFinalTranscript(accumulatedTranscript);
        accumulatedTranscript = "";
      } else {
        console.warn("No valid input detected.");
       toast.error('No valid input detected.')
      }
    };

    recognitionRef.current.start();
  }, [updateConversation, setUserResponse, onFinalTranscript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const speak = useCallback((message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    synthRef.current?.speak(utterance);
    return new Promise((resolve) => {
      utterance.onend = resolve;
    });
  }, []);

  return { startListening, stopListening, speak };
};

