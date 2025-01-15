import { createContext,useEffect,useState } from "react";
// import runChat from "../../config/geminiapi";


export const DispatchContext = createContext();



const ContextProvider = (props)=>{
    const [input,setInput]= useState('Context API setup');
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [token, setToken] = useState('')
    const [selectedScenario, setSelectedScenario] = useState(null);
     const [scenario, setScenario] = useState({})
       const [isSimulationActive, setIsSimulationActive] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [result,setResult]= useState('');

//     const [recentPrompt, setRecentPrompt] = useState('');
//     const [showResult, setshowResult] = useState(false);
//     const [messages, setMessages] = useState({
//       text: [],
//       images: [],
//       videos: [],
//       memes: [],
//     });
//     const [extend, setExtend] = useState(null);
//     const [summary, setSummary] = useState('')
//     const [summaryResult, setSummaryResult] = useState('')
//     const [isOpen, setIsOpen] = useState(true);
//     const [prompt, setPrompt] = useState("")



//     //summary request handler 
//     const handleSummarySubmit = async (query) => {
//       if (!query.trim()) return;
//       setLoading(true)
      
//       try {
//         const response = await handleOutputSubmit(query,'summary');
//         setSummaryResult(response);
//         setLoading(false)
//       } catch (error) {
//         console.error(error);
//       }
//     };
   

   


  
//     //for the sidebar button to make new chat and land on the chatbot
//     const newChatbtn=()=>{
//         setSummaryResult("")
//         setIsOpen(true)
        
//     }

//     //Regenerate handler for all the chats
//     const handleRegenerate = async (index) => {
//       // Identify the current page's messages
//       const pageMessages = messages[currentPage];
      
//       // Get the specific message to regenerate
//       const messageToRegenerate = pageMessages[index];
    
//       if (!messageToRegenerate) return;
    
//       // Add a temporary placeholder for the regenerated response
//       const tempMessage = { role: "chatbot", text: "", loading: true };
    
//       // Update the state to show the loading state
//       setMessages((prev) => {
//         const updatedMessages = { ...prev };
//         updatedMessages[currentPage] = [
//           ...pageMessages.slice(0, index),
//           tempMessage,
//           ...pageMessages.slice(index + 1),
//         ];
//         return updatedMessages;
//       });
    
//       try {
//         // Fetch the regenerated response
//         const regeneratedResponse = await handleOutputSubmit(messageToRegenerate.text);
    
//         // Update the state with the regenerated response
//         setMessages((prev) => {
//           const updatedMessages = { ...prev };
//           updatedMessages[currentPage] = [
//             ...pageMessages.slice(0, index),
//             { role: "chatbot", text: regeneratedResponse, loading: false },
//             ...pageMessages.slice(index + 1),
//           ];
//           return updatedMessages;
//         });
//       } catch (error) {
//         console.error("Error regenerating message:", error);
//         setMessages((prev) => {
//           const updatedMessages = { ...prev };
//           updatedMessages[currentPage] = [
//             ...pageMessages.slice(0, index),
//             { role: "chatbot", text: "Error: Unable to regenerate message.", loading: false },
//             ...pageMessages.slice(index + 1),
//           ];
//           return updatedMessages;
//         });
//       }
//     };
    
    

// // Handler function for all the chats that takes input and page type as arguments, send request to handleOutPutSubmit and recieve response and store them into correspondind state array according to page type. 
//     const handleInputSubmit = async (query, page) => {
//       if (!query.trim()) return;
//       setshowResult(true)
//       const userMessage = { role: "user", text: query };
//       const tempMessage = { role: "chatbot", text: "", loading: true };
//       setMessages((prev) => ({
//         ...prev,
//         [page]: [...prev[page], userMessage, tempMessage],
//       }));
//       setPrompt("")
//       try {
//         const response = await handleOutputSubmit(query,page);
//         setMessages((prev) => {
//           const updatedPageMessages = [...prev[page]];
//           updatedPageMessages[updatedPageMessages.length - 1] = {
//             role: "chatbot",
//             text: response,
//             loading: false,
//           };
    
//           return { ...prev, [page]: updatedPageMessages };
//         });
//         console.log(messages)
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//       const handleOutputSubmit = async (query,page) => {
//         try {
//           const response = await runChat(query,page); // Replace with your AI API call
//           console.log(response)
//           return response;
//         } catch (error) {
//           console.error("Error fetching AI response:", error);
//           return "Something went wrong. Please try again.";
//         }
//       };
      
//   useEffect(() => {
//       // Check localStorage for saved authentication state
//       const authToken = localStorage.getItem('authToken');
//       setToken(authToken)
//       const usermail = localStorage.getItem('usermail')
//       setUserEmail(usermail)
//       setIsAuthenticated(!!authToken);

//     }, []);


    const contextValue = {
      // extend, setExtend,
      // isOpen, setIsOpen,
      // summaryResult, setSummaryResult,
      // handleSummarySubmit,
      // handleRegenerate,
      //   handleInputSubmit,
      //   messages, setMessages,
      //   prompt, setPrompt,
      //   setInput,
      //   loading, setLoading,
      //   result,  setResult,
      //   recentPrompt,setRecentPrompt,
      //   showResult, setshowResult,
      //   newChatbtn,
      input,isAuthenticated,setIsAuthenticated,token,setToken,userEmail,setUserEmail,selectedScenario, setSelectedScenario,scenario, setScenario,isSimulationActive, setIsSimulationActive
    }
    return(

        <DispatchContext.Provider value={contextValue}>
            {props.children}
        </DispatchContext.Provider>
    )
}

export default ContextProvider;
