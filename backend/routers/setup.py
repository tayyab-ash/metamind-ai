from fastapi import APIRouter, Depends
from services.sql_connection import sql_connect

router = APIRouter(prefix='/setup', tags=['Setup'])


async def create_service():
        print("-----Initalizing Setup-----------")
        conn=sql_connect()
        cursor=conn.cursor()
        # Create user table
        # Define the table schema (modify as needed)
        create_table_query = """CREATE TABLE IF NOT EXISTS users (
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"""
        try:
           cursor.execute(create_table_query)
           print("1. users Table available")
        except Exception as e:
           print(f"An error occurred in user table Creation: {e}")

        # Define the table schema (modify as needed)
        create_table_query = """CREATE TABLE IF NOT EXISTS metadata (
         email TEXT NOT NULL,
         simulation_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         conversation_logs TEXT,
         feedback_generated TEXT);"""

        try:
           cursor.execute(create_table_query)
           print("2. file metadata Table available")
        except Exception as e:
           print(f"An error occurred in metadata table Creation: {e}")

        