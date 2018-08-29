from mongoengine import connect
from .map_events import MapEvents
from .map_polygon import MapPolygon

import os

connect('space-time', host=os.environ['mongo_db'])
