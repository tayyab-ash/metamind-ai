import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { ScenarioSelection } from "./ScenarioSelection";
import { SimulationTranscript } from "./SimulationTranscript";
import { SimulationControls } from "./SimulationControls";
import {
  conversationService,
  generateFeedbackService,
  scenarioService,
} from "@/api/scenarioApi";
import Loader from "./Loader";
import { useAppStore } from "@/Context/Zustand";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { toast } from "sonner";

function SimulationModule() {
  const {
    convHistory,
    setConvHistory,
    updateConversation,
    scenario,
    selectedScenario,
    userEmail,
    setSelectedScenario,
    setScenario,
    isSimulationActive,
    setIsSimulationActive,
    token,
    userResponse,
    setUserResponse,
    botResponse,
    setBotResponse,
    setReportData,
  } = useAppStore();

  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [convLoading, setConvLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const navigate = useNavigate();
  const handleConversationRef = useRef(null);

  const handleConversation = useCallback(
    async (message) => {
      setConvLoading(true);
      try {
        const chatlog = [
          {
            role: "Dispatcher",
            content: "Hello, This is 911! What is your emergency?",
          },
          {
            role: "bot",
            content:
              "i need your help. had an accident, need the ambulance urgently",
          },
          {
            role: "Dispatcher",
            content: "Hello we will reach there in 20 minutes",
          },
          {
            role: "Dispatcher",
            content: "This is Fahad. What is your emergency?",
          },
          {
            role: "Dispatcher",
            content: "This is Fahad. What is your emergency? ",
          },
          { role: "Dispatcher", content: "Hello. Hello. Can you hear me? " },
        ];

        const result = await conversationService(
          scenario.scenario_detailed,
          message,
          convHistory,
          token
        );
        if (result) {
          setIsBotSpeaking(true);
          setConvLoading(false);
          await speak(result);
          setIsBotSpeaking(false);
          updateConversation(result, "bot");
        }
      } catch (error) {
        console.log("Something went wrong, please try again");
      } finally {
        setConvLoading(false);
      }
    },
    [scenario, convHistory, token, updateConversation, setBotResponse]
  );

  useEffect(() => {
    handleConversationRef.current = handleConversation;
  }, [handleConversation]);

  const { startListening, stopListening, speak } = useSpeechRecognition(
    (transcript) => {
      if (handleConversationRef.current) {
        handleConversationRef.current(transcript);
      }
    }
  );

  const handleGenerateFeedback = useCallback(async () => {
    setFeedbackLoading(true);
    try {
      const result = await generateFeedbackService(
        userEmail,
        convHistory,
        token
      );
      if (result) {
        setReportData(result);
        setFeedbackLoading(false);
        setConvHistory([]);
        console.log(convHistory);
        setIsSimulationActive(false);

        toast.success(
          "Feedback Generated Successfully Redirecting you to Reports Section"
        );

        setTimeout(() => {
          navigate("/reports");
        }, 2000);
      }
    } catch (error) {
      console.log("Something went wrong, please try again");
    } finally {
      setFeedbackLoading(false);
    }
  }, [userEmail, convHistory, token, setReportData, navigate]);

  const handleScenarioSelection = useCallback(
    async (scenario) => {
      setSelectedScenario(scenario);
      setLoading(true);
      try {
        const data = await scenarioService(token, userEmail, scenario);
        if (data) {
          setScenario(data);
          setLoading(false);
          toast.success("Scenario generated Successfully");
        }
      } catch (error) {
        console.error("Error fetching scenario:", error);
      } finally {
        setLoading(false);
      }
    },
    [token, userEmail, setSelectedScenario, setScenario]
  );

  const handleStartSimulation = useCallback(() => {
    setIsSimulationActive(true);
    setIsBotSpeaking(true);
    speak(botResponse);
    setIsBotSpeaking(false);
  }, [botResponse, speak]);

  const handleMicToggle = useCallback(() => {
    if (isUserSpeaking) {
      stopListening();
      setIsUserSpeaking(false);
    } else {
      startListening();
      setIsUserSpeaking(true);
    }
  }, [isUserSpeaking, startListening, stopListening]);

  const handleEndSimulation = useCallback(() => {
    setIsSimulationActive(false);
    setScenario({});
  }, []);

  const memoizedTranscript = useMemo(
    () => (
      <SimulationTranscript
        setSelectedScenario={setSelectedScenario}
        onStartSimulation={handleStartSimulation}
        isSimulationActive={isSimulationActive}
        transcript={scenario}
        isBotSpeaking={isBotSpeaking}
        isUserSpeaking={isUserSpeaking}
        onEndSimulation={handleEndSimulation}
      />
    ),
    [
      setSelectedScenario,
      handleStartSimulation,
      isSimulationActive,
      scenario,
      isBotSpeaking,
      isUserSpeaking,
    ]
  );

  const memoizedControls = useMemo(
    () => (
      <SimulationControls
        handleGenerateFeedback={handleGenerateFeedback}
        convLoading={convLoading}
        isSimulationActive={isSimulationActive}
        isBotSpeaking={isBotSpeaking}
        isUserSpeaking={isUserSpeaking}
        onStartSimulation={handleStartSimulation}
        onMicToggle={handleMicToggle}
        onEndSimulation={handleEndSimulation}
        feedbackLoading={feedbackLoading}
      />
    ),
    [
      handleGenerateFeedback,
      isSimulationActive,
      isBotSpeaking,
      scenario,
      isUserSpeaking,
      handleStartSimulation,
      handleMicToggle,
      handleEndSimulation,
    ]
  );

  if (!selectedScenario) {
    return <ScenarioSelection onSelect={handleScenarioSelection} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="mt-10 gap-8">
        {memoizedTranscript}
        <div className="h-screen">{memoizedControls}</div>
      </div>
    </div>
  );
}

export default React.memo(SimulationModule);
