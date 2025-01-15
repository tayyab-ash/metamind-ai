from utility.auth_helper import create_access_token, encrypt_password, verify_password
from utility.auth_bearer import JWTBearer
from services.sql_connection import sql_connect
from model import *

from fastapi import FastAPI, Depends, HTTPException, status,APIRouter
from fastapi.responses import JSONResponse
from typing import Optional
import logging
import bcrypt


router = APIRouter(tags=['Authentication'])

logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(login_request: LoginRequest):
    """User login"""
    connection = sql_connect()
    cursor = connection.cursor()
    try:
        print(f"Login request received: {login_request.dict()}")
        
        # Validate email input
        if not login_request.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required."
            )
        
        # Query to check if the user exists
        query = """
        SELECT name, email, password, created_at
        FROM users 
        WHERE lower(email) = ?
        """
        cursor.execute(query, (login_request.email.lower(),))
        user = cursor.fetchone()
        print(f"User fetched from database: {user}")
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        # Validate the password
        stored_password = user[2]
        if not stored_password or not verify_password(login_request.password, stored_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        # Generate a JWT token
        jwtdata = {
            "email": login_request.email,
            "role": "user"
        }
        print(f"JWT data: {jwtdata}")
        jwt_token = create_access_token(jwtdata)
        print(jwt_token)
        return {
            "message": "User signed in successfully",
            "access_token": jwt_token,
            "user": {
                "name": user[0],
                "email": user[1]
            }
        }

    except HTTPException as e:
        logger.error(f"Login error: {e.detail} | Request: {login_request.dict()}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )
    finally:
        cursor.close()
        connection.close()
