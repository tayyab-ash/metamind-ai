import { create } from 'zustand';

export const useAppStore = create((set) => ({
  input: 'Context API setup',
  isAuthenticated: false,
  userEmail: '',
  token: '',
  selectedScenario: null,
  scenario: {},
  isSimulationActive: false,
  userResponse:"",
  botResponse:"Hello! This is nine one one. What is your emergency?",
  convHistory: [],
  reportData:{},

  // Actions to update state
  updateConversation: (message, role) =>
    set((state) => {
      const updatedHistory = [
        ...state.convHistory,
        { role, content: message },
      ];

      // Keep only the last 10 messages
      if (updatedHistory.length > 10) {
        updatedHistory.shift();
      }

      return { convHistory: updatedHistory };
    }),
   
  setConvHistory: (convHistory) => set({ convHistory }),
  setUserResponse: (userResponse) => set({ userResponse }),
  setReportData: (reportData) => set({ reportData }),
  setBotResponse: (botResponse) => set({ botResponse }),
  setInput: (input) => set({ input }),
  setInput: (input) => set({ input }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserEmail: (userEmail) => set({ userEmail }),
  setToken: (token) => set({ token }),
  setSelectedScenario: (selectedScenario) => set({ selectedScenario }),
  setScenario: (scenario) => set({ scenario }),
  setIsSimulationActive: (isSimulationActive) => set({ isSimulationActive }),
}));
