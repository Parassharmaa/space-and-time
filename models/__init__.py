from mongoengine import connect
from .map_events import MapEvents
from .map_polygon import MapPolygon
from .user import User
from .admin import Admin
from .contribution import Contribution
import os

connect('space-time', host=os.environ['mongo_db'])
