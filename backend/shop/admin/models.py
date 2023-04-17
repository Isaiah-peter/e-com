from shop import db
from shop.baseModel import BaseModel


class User(db.Model, BaseModel):
    __tablename__ = 'users'

    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    profile = db.Column(db.String)
    is_seller = db.Column(db.Boolean, default=False)

    def __init__(self, name, username, password, email, phone, profile=None, is_seller=None) -> None:
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.phone = phone
        self.profile = profile
        self.is_seller = is_seller
