from services.sql_connection import sql_connect,check_and_create_user_table
from utility.auth_helper import encrypt_password
from utility.auth_bearer import JWTBearer
from model import *
import ast, re
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.responses import JSONResponse
from typing import List, Optional

from datetime import datetime, timedelta
from typing import Optional
import logging
from uuid import uuid4
import bcrypt
import json
from threading import Thread
from agents.trainer_agent import TrainerAgent
from agents.human_bot_agent import HumanBotAgent
from agents.feedback_report_agent import FeedbackReportGenerator

logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


router = APIRouter(prefix="/users", tags=["Users"])


## Initialize the Trainer Agent
trainer_agent=TrainerAgent()
human_bot_agent = HumanBotAgent()
feedback_generator = FeedbackReportGenerator()
# def hash_password(password: str) -> str:
#     """Hash a plaintext password."""
#     salt = bcrypt.gensalt()
#     return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(signup_request:SignupRequest):
    """user signup"""
    connection = sql_connect()
    cursor = connection.cursor()

    try:
        # Check and create the user table if not exists
        check_and_create_user_table()

        # Check if the email already exists
        check_query = f"""SELECT COUNT(*) FROM users WHERE lower(email) = '{signup_request.email.lower()}'"""
        cursor.execute(check_query)
        result = cursor.fetchone()

        if result[0] > 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"User with email '{signup_request.email}' already exists.")
        insert_query = """
        INSERT INTO users (
            name, email, password, created_at
        ) VALUES (?, ?, ?, CURRENT_TIMESTAMP);
        """

        # Execute the query with parameterized inputs
        cursor.execute(
            insert_query,
            (signup_request.name, signup_request.email.lower(), encrypt_password(signup_request.password)))

        connection.commit()
        return JSONResponse(content="User signed up successfully", status_code=201)

    except HTTPException as e:
        logger.error(f"signup- Error in adding User: {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="An unexpected error occurred.")
    finally:
        cursor.close()
        connection.close()


@router.post("/generate_scenario",dependencies=[Depends(JWTBearer())])
def generate_scenario(scenario_request:GenerateScenario):
    """Fetch the list of allowed domains."""
    try:
        conn = sql_connect()
        cursor = conn.cursor()
        emergency_type=scenario_request.emergency_type
        email = scenario_request.email
        cursor.execute("SELECT feedback_generated FROM metadata WHERE email = ?", (email,))
        result = cursor.fetchone()

        if result:
            feedback_reports = ast.literal_eval(re.findall(r'{.*?}', result[0], re.DOTALL)[0])['keyphrases_feedback']  # Assuming feedback_generated is the first column in the SELECT query 
        else:
            feedback_reports = None  # Handle case where no record is found
        scenario=trainer_agent.process_request(emergency_type,feedback_reports)
        print(scenario['scenario_prompt'])
        return JSONResponse(content=json.loads(re.findall(r'{.*?}', scenario['scenario_prompt'], re.DOTALL)[0]), status_code=201)
    except Exception as e:
        return JSONResponse(content=f"Generate Scenario :: Bad Request {e}", status_code=400)
    finally:
        cursor.close()
        conn.close()

@router.post("/convers",dependencies=[Depends(JWTBearer())])
def generate_conversation(convers_request:GenerateConversation):
    """Fetch the list of allowed domains."""
    try:
        scenario = convers_request.scenario
        dispatcher_text = convers_request.dispatcher_text
        conv_history = convers_request.conv_history
        # scenario = str(scenario).replace("{", "").replace("}", "").replace("'", "")
        bot_response = human_bot_agent.get_bot_response(dispatcher_text, scenario, conv_history)
        return JSONResponse(content=bot_response, status_code=201)

    except Exception as e:
        return JSONResponse(content=f"Generate Conversation :: Bad Request {e}", status_code=400)

@router.post("/feedback",dependencies=[Depends(JWTBearer())])
def generate_feedback(feedback_request:GenerateFeedback):
    """Fetch the list of allowed domains."""
    try:
        conn = sql_connect()
        cursor = conn.cursor()
        # Generate feedback report
        feedback_report = feedback_generator.generate_feedback(feedback_request.conv_logs)
        feedback_report=feedback_report['feedback_report']

        try:
            # report = re.findall(r'{.*?}', feedback_report['feedback_report'], re.DOTALL)
            # report = json.loads(report[0])
            report=feedback_report[feedback_report.find("{"):feedback_report.rfind("}")+1]
            report=eval(report)

        except Exception as e:
            print("Exception raised during fetching Json format of feedback report: ", e)
            report = feedback_report['feedback_report']

        insert_query = """
        INSERT INTO metadata (email, conversation_logs, feedback_generated)
        VALUES (?, ?, ?);
        """
        cursor.execute(insert_query, (feedback_request.email, str(feedback_request.conv_logs), str(report)))
        conn.commit()

        return JSONResponse(content=report, status_code=201)

    except Exception as e:
        return JSONResponse(content=f"Generate Feedback :: Bad Request {e}", status_code=400)
    finally:
        cursor.close()
        conn.close()   

@router.post("/get_feedback",dependencies=[Depends(JWTBearer())])
def get_feedback(get_feedback_request:GetFeedback):
    """Fetch the list of allowed domains."""
    try:
        email=get_feedback_request.email
        conn = sql_connect()
        cursor = conn.cursor()
        query=f"select email,simulation_created,conversation_logs,feedback_generated from metadata where email='{email}'"
        cursor.execute(query)
        rows=cursor.fetchall()
        return JSONResponse(content=rows, status_code=201)
    except Exception as e:
        return JSONResponse(content=f"Generate Feedback :: Bad Request {e}", status_code=400)
    finally:
        cursor.close()
        conn.close()   