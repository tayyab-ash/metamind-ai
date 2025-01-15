from utility.llm import ask_LLM


# human >> speech to text >> initialize_conversation >> bot >> text >> text to speech >> frontend >> Stop >> feedback >> ui

class HumanBotAgent:
    def __init__(self, name="HumanBotAgent"):
        self.name = name
        self.conversation_context = []

    def initialize_conversation(self, user_input: str = "Hi! This is 911. How may I help you?", prompt: str = None):
        """Start the conversation with the initial scenario."""
        # system_message = "You are a distressed 911 caller. Be realistic and emotional. Consider yourself in such situation and act accordingly like try to be precise, short and crisp."

        system_message = (
            "You are a male, english speaking, distressed 911 caller in a realistic emergency situation. Your role is "
            "to simulate a caller who might be directly or indirectly involved in the incident. "
            "Your must respond with details that align with the scenario given by the user and "
            "show relevant emotions such as sadness, stress, confused, etc. according to your role and scenario."
            "Always continue the conversation according to the conversation history provided by user."
            "Your response MUST NOT EXCEED THE WORD LIMIT OF 30 WORDS and it must be a conversation only. No describing words like 'background noise, stammering, etc'"
        )
        self.conversation_context.append({'role': 'system', 'content': system_message})
        self.conversation_context.append({'role': 'user', 'content': prompt})
        
        # Initial message to kickstart conversation "Hello, This is 911! What is your emergency?"
        bot_response = ask_LLM(input_text=user_input, context=prompt, system_message=system_message)
        # self.conversation_context.append("Dispatcher: Hello, This is 911! What is your emergency?\n")
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})
        # self.conversation_context.append(f"Person: {bot_response}\n")
        
        return bot_response

    def get_bot_response(self, user_input, scenario, conv_history):
        """Generate the next response from the bot."""
        # self.conversation_context.append({'role': 'user', 'content': user_input})
        context = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conv_history])

        # "You are a distressed 911 caller and you have the context of the scenario and the ongoing conversation."
        #                 "Your task is to continue the conversation as a real caller based on the scenario and context"
        #                 "Your response must not be more than 60 words"

        prompt = "Scenario: " + str(scenario) + "\n" + "Following is the conversation history:\n" + str(context)

        bot_response = ask_LLM(input_text=user_input, context=prompt, system_message= (
            "You are a male, english speaking, distressed 911 caller in a realistic emergency situation. Your role is "
            "to simulate a caller who might be directly or indirectly involved in the incident. "
            "Your must respond with details that align with the scenario given by the user and "
            "show relevant emotions such as sadness, stress, confused, etc. according to your role and scenario."
            "Always continue the conversation according to the conversation history provided by user."
            "Your response MUST NOT EXCEED THE WORD LIMIT OF 30 WORDS."
        ))
        self.conversation_context.append({'role': 'assistant', 'content': bot_response})

        return bot_response

    def get_conversation_logs(self):
        """Return the full conversation logs."""
        return self.conversation_context
