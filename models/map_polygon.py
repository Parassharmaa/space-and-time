from mongoengine import Document
from mongoengine import StringField, DictField


class MapPolygon(Document):
    title_id = StringField(required=True, unique=True)
    features = DictField()