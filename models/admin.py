from mongoengine import Document
from mongoengine import StringField

class Admin(Document):
    name = StringField(required=True)
    username = StringField(unique=True, required=True)
    password = StringField(required=True)
