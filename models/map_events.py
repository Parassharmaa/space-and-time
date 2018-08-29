from mongoengine import Document
from mongoengine import StringField, DictField


class MapEvents(Document):
    title_id = StringField(required=True, unique=True)
    events = DictField()