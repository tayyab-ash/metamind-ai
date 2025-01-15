import speech_recognition as sr
from gtts import gTTS
import pyttsx3
import os
from agents.trainer_agent import TrainerAgent
from agents.human_bot_agent import HumanBotAgent
from agents.feedback_report_agent import FeedbackReportGenerator

# Initialize agents
trainer_agent = TrainerAgent()
human_bot_agent = HumanBotAgent()
feedback_generator = FeedbackReportGenerator()

# Initialize TTS engine
tts_engine = pyttsx3.init()

def text_to_speech(text):
    """Convert text to speech using pyttsx3."""
    tts_engine.say(text)
    tts_engine.runAndWait()

def speech_to_text():
    """Convert speech to text using SpeechRecognition."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            return recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            return "Sorry, I couldn't understand. Could you please repeat?"
        except sr.RequestError as e:
            return "Error with the speech recognition service: {}".format(e)
        except sr.WaitTimeoutError:
            return "No response detected. Please try again."

# Step 1: Generate a scenario prompt
# feedback + user interest 
feedback_reports = [{"session_id": 1, "issues": ["slow response time", "missed protocol steps"]}]

scenario_request = trainer_agent.process_request(feedback_reports)
scenario_prompt = scenario_request["scenario_prompt"]

print("Scenario:", scenario_prompt)

# Step 2: Start the conversation
text_to_speech("The conversation is starting now.")
print("\nStarting conversation...\n")
bot_response = human_bot_agent.initialize_conversation(scenario_prompt)
print("Bot:", bot_response)
text_to_speech(bot_response)

# Step 3: Engage in conversation
while True:
    user_input = speech_to_text()
    print("Distressed Caller:", user_input)

    if user_input.lower() in ["quit", "exit", "bye"]:
        text_to_speech("Ending the conversation now.")
        print("\nEnding conversation...\n")
        break

    bot_response = human_bot_agent.get_bot_response(user_input)
    print("Bot:", bot_response)
    text_to_speech(bot_response)

# Step 4: Retrieve full conversation logs
conversation_logs = human_bot_agent.get_conversation_logs()

# Debug logs before sending to feedback generator
print("\nDEBUG: Conversation Logs Before Feedback Generation:\n", conversation_logs)

# Generate feedback report
feedback_report = feedback_generator.generate_feedback(conversation_logs)

# Display feedback report
print("\nFeedback Report:\n")
print(feedback_report["feedback_report"])
text_to_speech("The feedback report has been generated.")
