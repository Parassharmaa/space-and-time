from mongoengine import Document
from mongoengine import StringField, ReferenceField, ListField

class User(Document):
    name = StringField(required=True)
    email = StringField(unique=True, required=True)
    photo = StringField()
    about = StringField()
