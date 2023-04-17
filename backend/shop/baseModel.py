#!/usr/bin/python3
"""This module defines a base class for all models in our hbnb clone"""
from datetime import datetime
from shop import db
from sqlalchemy_serializer import SerializerMixin


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

