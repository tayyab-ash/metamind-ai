from pydantic import BaseModel
from typing import Optional

# Pydantic models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str

class GenerateScenario(BaseModel):
    emergency_type: str
    email: str
    
class GenerateConversation(BaseModel):
    scenario: str
    dispatcher_text: str
    conv_history: list[dict]

class GenerateFeedback(BaseModel):
    email: str
    conv_logs: list[dict]


class GetFeedback(BaseModel):
    email: str
