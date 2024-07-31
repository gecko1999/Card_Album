from dotenv import load_dotenv
import os
import redis

load_dotenv()

class AplicationConfig:
   
    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS= False
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = True

