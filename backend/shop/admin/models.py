from shop import db, app
from shop.baseModel import BaseModel
from datetime import datetime, timedelta
import jwt


class User(db.Model, BaseModel):
    __tablename__ = 'users'

    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    profile = db.Column(db.String)
    is_seller = db.Column(db.Boolean, default=False)
    products = db.relationship(
        'Product', backref='user', cascade="all, delete-orphan", lazy=True)
    addresses = db.relationship('Address', backref='orders',
                                cascade="all, delete-orphan", lazy=True)

    def __init__(self, name, username, password, email, phone, profile=None, is_seller=None) -> None:
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.phone = phone
        self.profile = profile
        self.is_seller = is_seller

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=0, hours=24, seconds=5),
                'iat': datetime.utcnow(),
                'sub': {
                    "user_id": user_id,
                    "seller": self.is_seller
                }
            }
            return jwt.encode(
                payload,
                app.config.get('secret_key'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get(
                'secret_key'), algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def auth(self, request) -> bool:
        auth_header = request.headers.get('Authorization')
        auth_token = auth_header.split(' ')[1]

        user = self.decode_auth_token(auth_token=auth_token)
        if user.get('seller') == False:
            return False
        return True

    @property
    def serializable(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'username': self.username,
            'profile': self.profile,
            'phone': self.phone,
        }
