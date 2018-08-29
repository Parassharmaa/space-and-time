from flask_restful import Resource, reqparse
from models import MapPolygon
from common import wrap_data

class MapPolygonApi(Resource):
    def get(self, title_id):
        try:      
            data = MapPolygon.objects(title_id=title_id)
            return wrap_data(data), 200
        except Exception as e:
            return {"message": "An error occured"}, 401
