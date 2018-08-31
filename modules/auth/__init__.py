from flask import request, Response
import jwt
from functools import wraps
import os


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            auth = request.headers['Authorization']
            if not auth:
                raise Exception("No Auth Token")
            payload = jwt.decode(
                auth, os.environ['secret_key'], algorithm='HS256')
            if not payload.get('email'):
                raise Exception(jwt.InvalidTokenError)
        except jwt.ExpiredSignatureError:
            return {'message': 'Signature expired. Please log in again.'}
        except jwt.InvalidTokenError:
            return {'message': 'Invalid token. Please log in again.'}, 401
        except Exception as e:
            return {'message': 'Please, Login in again'}, 401
        return f(*args, **kwargs)

    return decorated


def requires_auth_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            auth = request.headers['Authorization']
            if not auth:
                raise Exception("No Auth Token")
            payload = jwt.decode(
                auth, os.environ['secret_key'], algorithm='HS256')
            if not payload.get('username'):
                if payload.get('admin') != 1:
                    raise Exception(jwt.InvalidTokenError)
        except jwt.ExpiredSignatureError:
            return {'message': 'Signature expired. Please log in again.'}
        except jwt.InvalidTokenError:
            return {'message': 'Invalid token. Please log in again.'}, 401
        except Exception as e:
            return {'message': 'Please, Login in again'}, 401
        return f(*args, **kwargs)

    return decorated
