from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
import cloudinary
from flask_cors import CORS



cloudinary.config(
    cloud_name = "dieusg1qo",
    api_key = "874512347679454",
    api_secret = "VRynsM7TUYOjD9tS4NIZvDbKTBM",
    secure = True
)
app = Flask(__name__)

cors = CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:secret@localhost:5432/ecom"
app.config["secret_key"] = "qwertyuiopasdfghjkl"
db = SQLAlchemy()
db.init_app(app)
bcrypt = Bcrypt(app)

migrage = Migrate()

migrage.init_app(app, db)
from shop.admin.routes import auth
app.register_blueprint(auth)

from shop.admin import routes
from shop.products import routes
from shop.carts import routes
from shop.order import routes