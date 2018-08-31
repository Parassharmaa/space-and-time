import config
import json
import jwt
import os
import hashlib
from flask_restful import Resource, reqparse
from models import User, Admin
import requests
from auth import requires_auth, requires_auth_admin

parser = reqparse.RequestParser()

parser.add_argument('id_token', type=str)


class GoogleAuth(Resource):
    def get(self):
        try:
            args = parser.parse_args()
            id_token = str(args['id_token'])
            res = requests.get(
                "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={}".
                format(id_token)).json()
            if res.get('error_description'):
                return {"message": "An error ocurred"}, 401
            u = User.objects(email=res['email'])
            if not u:
                user_obj = User(
                    email=res['email'], name=res['name'], photo=res['picture'])
                user_obj.save()
            token = jwt.encode(
                {
                    'email': res['email'],
                    'name': res['name'],
                    'photo': res['picture']
                },
                os.environ['secret_key'],
                algorithm='HS256')
            return {"token": token.decode()}
        except Exception as e:
            print(e)
            return {"message": "An error ocurred"}, 401


parser.add_argument('username', type=str)
parser.add_argument('password', type=str)


class AdminAuth(Resource):
    def post(self):
        try:
            args = parser.parse_args()
            username = args['username']
            password = args['password']
            password = hashlib.sha256(password.encode()).hexdigest()
            a = Admin.objects(username=username, password=password)
            if a:
                token = jwt.encode(
                    {
                        'username': username,
                        'admin': 1
                    },
                    os.environ['secret_key'],
                    algorithm='HS256')
                return {"token": token.decode()}
            return {"message": "Invalid username or password"}, 401
        except Exception as e:
            return {"message": "An error ocurred"}, 401


class ValidateAdmin(Resource):
    decorators = [requires_auth_admin]

    def get(self):
        return {"message": "ok"}


class ValidateUser(Resource):
    decorators = [requires_auth]

    def get(self):
        return {"message": "ok"}
