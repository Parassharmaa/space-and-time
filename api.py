import config
import os
from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from map_events_api import MapEventsApi
from map_polygon_api import MapPolygonApi
from auth_api import GoogleAuth, AdminAuth, ValidateAdmin, ValidateUser
from contributions_api import ListContribution, AddContribution, ReviewContribution

app = Flask(__name__, static_folder='build/')
api = Api(app, prefix="/v1")
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# data api
api.add_resource(MapEventsApi, '/map/events/<string:title_id>')
api.add_resource(MapPolygonApi, '/map/polygon/<string:title_id>')

# auth api
api.add_resource(AdminAuth, '/auth/admin')
api.add_resource(GoogleAuth, '/auth/google')
api.add_resource(ValidateAdmin, '/validate/admin')
api.add_resource(ValidateUser, '/validate/user')

# contribution api
api.add_resource(ListContribution, '/contributions/<string:title_id>')
api.add_resource(AddContribution, '/contributions/add/<string:title_id>')
api.add_resource(ReviewContribution, '/contributions/review/<string:title_id>')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build/', path)
    else:
        return send_from_directory('build/', 'index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
