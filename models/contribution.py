from mongoengine import Document
from mongoengine import StringField, ListField, IntField, BooleanField


class Contribution(Document):
    title_id = StringField(required=True)
    title = StringField(required=True)
    description = StringField()
    year = IntField(required=True)
    plot = ListField()
    edit_id = StringField(default=None)
    is_reviewed = BooleanField(default=False)
    is_deleted = BooleanField(default=False)
