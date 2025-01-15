# For storing and retrieving feedback reports
import json

def save_feedback_report(report, filename="feedback_reports.json"):
    with open(filename, "w") as file:
        json.dump(report, file)

def load_feedback_reports(filename="feedback_reports.json"):
    try:
        with open(filename, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
