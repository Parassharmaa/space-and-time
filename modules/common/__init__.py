import json
import jwt
import os

def wrap_data(data):
    return json.loads(data.to_json())

def parse_jwt(token):
    payload = jwt.decode(token, os.environ['secret_key'], algorithm='HS256')
    return payload