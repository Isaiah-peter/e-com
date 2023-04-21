from shop import db, app
from shop.baseModel import BaseModel


class Cart(db.Model, BaseModel):
    __tablename__ = 'carts'

    totalprice = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        nullable=False)
    product_qties = db.relationship('ProductQty', backref='carts',
                                    cascade="all, delete-orphan", lazy=True)

    @property
    def serializable(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "totalprice": self.totalprice,
            "quantity": self.quantity,
        }

    @staticmethod
    def GetCarts(db):
        cart = db.session.query(Cart).join(Cart.product_qties).options(
            db.contains_eager(Cart.product_qties)
        ).filter(ProductQty.ordered == False).all()
        return dict(Cart=[dict(c.serializable,
                               product_qties=[i.serializable for i in c.product_qties])
                          for c in cart])


class ProductQty(db.Model, BaseModel):
    __tablename__ = 'product_qties'

    quantity = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    ordered = db.Column(db.Boolean, nullable=False, default=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)

    @property
    def serializable(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "ordered": self.ordered,
            "color": self.color,
            "size": self.size
        }
