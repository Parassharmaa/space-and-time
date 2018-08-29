import config
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from map_events_api import MapEventsApi
from map_polygon_api import MapPolygonApi

app = Flask(__name__)
api = Api(app, prefix="/v1")
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api.add_resource(MapEventsApi, '/map/events/<string:title_id>')
api.add_resource(MapPolygonApi, '/map/polygon/<string:title_id>')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
