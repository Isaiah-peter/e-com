from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate


app = Flask(__name__)
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