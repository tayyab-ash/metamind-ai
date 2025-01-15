import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneCall, PhoneOff } from "lucide-react";
import chatbot from "@/assets/chatbot.jpg";
import userImg from "@/assets/user.jpg";
import { Bars } from "react-loader-spinner";

export function SimulationControls({
  isSimulationActive,
  isBotSpeaking,
  isUserSpeaking,
  onStartSimulation,
  onMicToggle,
  onEndSimulation,
  handleGenerateFeedback,
  convLoading,
  feedbackLoading,
}) {
  if (isSimulationActive) {
    return (
      <div className="flex flex-col mt-10  space-y-20">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-200">
          Simulator Conversation
        </h1>
        <div className="flex justify-center space-x-2 md:space-x-60 transition-all easae-in duration-100">
          {/* Dispatcher Card */}
          <div
            className={`w-80 h-64 bg-gradient-to-r from-white/60 to-white/40 shadow-md rounded-3xl flex flex-col items-center justify-center transition-all duration-300 relative cursor-pointer overflow-hidden ${
              isBotSpeaking ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={onMicToggle}
          >
            <div className="absolute top-4 right-4 z-20">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onMicToggle();
                }}
              >
                {isUserSpeaking ? (
                  <Mic className="h-4 w-4 text-red-500" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="relative w-24 h-24 md:w-40 md:h-40">
              {isUserSpeaking && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 rounded-full bg-gray-100 opacity-75 animate-ping-slow"></div>
                  <div className="absolute inset-0 rounded-full bg-gray-100 opacity-50 animate-ping-slow animation-delay-300"></div>
                  <div className="absolute inset-0 rounded-full bg-gray-100 opacity-25 animate-ping-slow animation-delay-600"></div>
                </div>
              )}
              <img
                src={userImg}
                alt="Dispatcher"
                className="relative z-10 h-full w-full rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          </div>

          {convLoading && (
            <div className="flex items-center">
              <Bars
                height="80"
                width="80"
                color="#CEE2DC"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
          {/* ChatBot Card */}
          <div className="w-80 h-64 overflow-hidden bg-gradient-to-r  from-white/60 to-white/40 shadow-md rounded-3xl flex flex-col items-center justify-center transition-all duration-300">
            <div className="relative w-24 h-24 md:w-40 md:h-40 mb-4 ">
              {isBotSpeaking && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 rounded-full bg-green-300 opacity-75 animate-ping-slow"></div>
                  <div className="absolute inset-0 rounded-full bg-green-300 opacity-50 animate-ping-slow animation-delay-300"></div>
                  <div className="absolute inset-0 rounded-full bg-green-300 opacity-25 animate-ping-slow animation-delay-600"></div>
                </div>
              )}
              <img
                src={chatbot}
                alt="ChatBot"
                className="relative z-10 w-full h-full rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {feedbackLoading ? (
            <div className="flex items-center">
              <Bars
                height="40"
                width="40"
                color="#CEE2DC"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <Button
              className="p-6 text-lg w-max rounded-full flex items-center space-x-2 mt-4"
              onClick={handleGenerateFeedback}
              variant="outline"
            >
              <PhoneOff className="h-5 w-5 text-red-500" />
              <span className="text-red-500">End Simulation</span>
            </Button>
          )}
        </div>
      </div>
    );
  }
}
