from mongoengine import Document
from mongoengine import StringField, IntField, ListField


class MapEvents(Document):
    title_id = StringField(required=True)
    title = StringField(required=True)
    year = IntField(required=True)
    description = StringField()
    plot = ListField()
    