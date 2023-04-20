#!/usr/bin/python3
"""This module defines a base class for all models in our hbnb clone"""
from datetime import datetime
from shop import db
from sqlalchemy_serializer import SerializerMixin
import json

TIMESTAMP_FORMAT = "%Y-%m-%dT%H:%M:%S"

class BaseModel(SerializerMixin):
    """A base class for all hbnb models"""
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow(), nullable=False)

    def __init__(self, created_at=datetime.utcnow(), updated_at=datetime.utcnow(),):
        """Instatntiates a new model"""
        self.id = id
        self.created_at = created_at
        self.updated_at = updated_at

    def to_json(self, for_serialization: bool = False) -> dict:
        """ Convert the object a JSON dictionary
        """
        result = {}
        for key, value in self.__dict__.items():
            if not for_serialization and key[0] == '_':
                continue
            if type(value) is datetime:
                result[key] = value.strftime(TIMESTAMP_FORMAT)
            else:
                result[key] = value
        return result
    
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

