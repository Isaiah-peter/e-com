from shop import db, app
from shop.baseModel import BaseModel


class Cart(db.Model, BaseModel):
    __tablename__ = 'carts'

    color = db.Column(db.String, nullable=False)
    totalprice = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                           nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)
    

class ProductQty(db.Model, BaseModel):
    __tablename__ = 'product_qties'

    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    