from utility.llm import ask_LLM


class TrainerAgent:
    def __init__(self, name="TrainerAgent"):
        self.name = name

    def process_request(self,emergency_type, feedback_reports=None): # input: emergency type
        """
        Generate a scenario prompt based on feedback reports.

        Args:
            feedback_reports (list): List of feedback summaries from previous sessions.

        Returns:
            dict: Contains the generated scenario prompt.
        """
        # system_message = "You are a training agent for 911 dispatchers. Your task is to generate a prompt for a large language model giving him the role of distressed caller who is calling 911 for help."

        # system_message = (
        #     "You are a senior 911 training coordinator tasked with generating highly realistic, "
        #     "challenging 911 call scenarios for dispatcher practice. You must incorporate common "
        #     "dispatcher mistakes from past sessions into new scenarios to ensure continuous "
        #     "improvement."
        # )
        system_message = (
            "You are an expert training agent for 911 dispatchers. Your role is to create realistic and challenging training scenarios "
            "for a large language model that will simulate distressed callers in emergency situations. The generated scenarios should "
            "be detailed and incorporate feedback from previous training sessions to address areas where dispatchers need improvement. "
            "Focus on crafting scenarios with enough complexity to test the trainee's ability to handle difficult callers, gather critical "
            "information efficiently, and respond effectively under pressure. Emphasize verifying location details and handling emotional distress."
        )

        if feedback_reports:
            # Create a summary of feedback reports
            # feedback_summary = "\n".join([f"Session {r['session_id']}: {', '.join(r['issues'])}" for r in feedback_reports])
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios. Consider these issues done by dispatchers from past sessions:\n{feedback_summary}"
            input_text = f"""
                Generate a realistic and detailed 911 call scenario for the "{emergency_type}" type of emergency based on the following past feedback:
                - {feedback_reports}

                ## Past Feedback Integration:
                - Focus on addressing issues identified in previous feedback sessions to highlight specific improvement areas for the dispatcher:
                {feedback_reports}

                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller whose gender is MALE,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario_brief: str | A short, crisp and precise information about the incident or accident or emergency or the situation."
                "scenario_detailed: str | A detailed description about the incident (Not more than 60 words) including rich contextual details (e.g., weather, time of day, environment, etc.)."

                """

        
        else:

            # Use LLM to create a scenario prompt
            # input_text = f"Generate a realistic 911 call scenario for emergency {emergency_type}. Try to generate random scenarios."
            input_text = f"""
                Generate a realistic and detailed 911 call scenario for the "{emergency_type}" type of emergency.

                ## Output Format:
                The output must be only in JSON Format with following keys:
                "callers_name": str | name of the caller whose gender is MALE,
                "callers_contact_no": str | caller's contact number,
                "callers_location: str | caller's location,
                "callers_emergency_type: str | emergency type of caller,
                "scenario_title": str | scenario title outline,
                "scenario_brief: str | A short, crisp and precise information about the incident or accident or emergency or the situation."
                "scenario_detailed: str | A detailed description about the incident (Not more than 60 words) including rich contextual details (e.g., weather, time of day, environment, etc.) along with caller information (name, number and location)."

                """

        scenario_prompt = ask_LLM(input_text=input_text, system_message=system_message, temperature=0.6)

        return {"scenario_prompt": scenario_prompt}
