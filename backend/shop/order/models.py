from shop import db, app
from shop.baseModel import BaseModel


class Order(db.Model, BaseModel):
    __tablename__ = 'orders'

    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False, default="pending")
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    order_qties = db.relationship('OrderQty', backref='orders',
                                  cascade="all, delete-orphan", lazy=True)
    addresses = db.relationship('Address', backref='addresses_orders',
                                cascade="all, delete-orphan", lazy=True)
    
    @property
    def serializable(self):
        return {
            "id": self.id,
            "payment_method": self.payment_method,
            "amount": self.amount,
            "status": self.status,
            "user_id": self.user_id,
            "cart_id": self.cart_id,
            "created_at": self.created_at
        }
    
    @staticmethod
    def GetOrders(db):
        orders = db.session.query(Order).join(Order.addresses).join(Order.order_qties).options(
            db.contains_eager(Order.addresses),
            db.contains_eager(Order.order_qties)
        ).all()
        print(orders)
        return dict(Order=[dict(d.serializable,
                               order_qties=[i.serializable for i in d.order_qties],
                               addresses=[i.serializable for i in d.addresses])
                          for d in orders])
    
    def GetOrder(db, id):
        orders = db.session.query(Order).join(Order.addresses).join(Order.order_qties).options(
            db.contains_eager(Order.addresses),
            db.contains_eager(Order.order_qties)
        ).filter(Order.id == id).first()
        return dict(orders.serializable,
                               order_qties=[i.serializable for i in orders.order_qties],
                               addresses=[i.serializable for i in orders.addresses])


class OrderQty(db.Model, BaseModel):
    __tablename__ = 'orders_qties'

    quantity = db.Column(db.Float, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(
        'orders.id'), nullable=False)
    
    @property
    def serializable(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "created_at": self.created_at
        }


class Address(db.Model, BaseModel):
    __tablename__ = 'addresses'

    address = db.Column(db.String(), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(
        'orders.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    @property
    def serializable(self):
        return {
            "id": self.id,
            "address": self.address
        }
