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
            payload = jwt.decode(auth_token, app.config.get('secret_key'), algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


class BlacklistToken(db.Model):
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'blacklist_tokens'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)
