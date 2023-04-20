from shop import db, app
from shop.baseModel import BaseModel


class Order(db.Model, BaseModel):
    __tablename__ = 'orders'

    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, nullable=False, default="pending")
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)
    order_qties = db.relationship('OrderQty', backref='orders',
                                  cascade="all, delete-orphan", lazy=True)
    addresses = db.relationship('Address', backref='orders',
                                cascade="all, delete-orphan", lazy=True)


class OrderQty(db.Model, BaseModel):
    __tablename__ = 'orders_qties'

    quantity = db.Column(db.Float, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(
        'orders.id'), nullable=False)


class Address(db.Model, BaseModel):
    __tablename__ = 'addresses'

    address = db.Column(db.String(), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(
        'orders.id'), nullable=False)
    user_id = db.Column(db.Interger, db.ForeignKey('users.id'), nullable=False)
