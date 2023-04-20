from shop import db
from shop.baseModel import BaseModel
from sqlalchemy import desc


class Product(db.Model, BaseModel):
    __tablename__ = 'products'

    name = db.Column(db.String, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                          nullable=False)
    longname = db.Column(db.String, nullable=False)
    desc = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    imageurl = db.Column(db.String, nullable=False)
    in_stock = db.Column(db.Integer, nullable=False)

    categories = db.relationship(
        'Category', backref='products', cascade="all, delete-orphan", lazy=True)
    colors = db.relationship('Color', backref='products',
                             cascade="all, delete-orphan", lazy=True)
    sizes = db.relationship("Size", backref='products',
                            cascade="all, delete-orphan", lazy=True)

    @property
    def serializable(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.imageurl,
            'in_stock': self.in_stock,
            'price': self.price,
            'longname': self.longname,
            'description': self.desc,
            'created_at': self.created_at,
        }

    @staticmethod
    def getProduct(db):
        products = db.session.query(Product).join(Product.colors).join(
            Product.categories).join(Product.sizes).options(
            db.contains_eager(Product.categories),
            db.contains_eager(
                Product.colors),db.contains_eager(Product.sizes)).all()
        return dict(Product=[dict(p.serializable,
                                  color=[i.serializable for i in p.colors],
                                  category=[
                                      i.serializable for i in p.categories],
                                  size=[i.serializable for i in p.sizes])
                             for p in products])
    
    @staticmethod
    def getProductById(db, id):
        products = db.session.query(Product).join(Product.colors).join(
            Product.categories).join(Product.sizes).options(
            db.contains_eager(Product.categories),
            db.contains_eager(
                Product.colors),db.contains_eager(Product.sizes)).filter(Product.id == id).all()
        return dict(Product=[dict(p.serializable,
                                  color=[i.serializable for i in p.colors],
                                  category=[
                                      i.serializable for i in p.categories],
                                  size=[i.serializable for i in p.sizes])
                             for p in products])
    
    def getProductByRelatedClassesName(db, classes, name):
        products = db.session.query(Product).join(Product.colors).join(
            Product.categories).join(Product.sizes).options(
            db.contains_eager(Product.categories),
            db.contains_eager(
                Product.colors),db.contains_eager(Product.sizes)).filter(classes.name == name).all()
        return dict(Product=[dict(p.serializable,
                                  color=[i.serializable for i in p.colors],
                                  category=[
                                      i.serializable for i in p.categories],
                                  size=[i.serializable for i in p.sizes])
                             for p in products])
    
    def getNewProduct(db):
        products = db.session.query(Product).join(Product.colors).join(
            Product.categories).join(Product.sizes).options(
            db.contains_eager(Product.categories),
            db.contains_eager(
                Product.colors),db.contains_eager(Product.sizes)).order_by(desc(Product.created_at)).all()
        return dict(Product=[dict(p.serializable,
                                  color=[i.serializable for i in p.colors],
                                  category=[
                                      i.serializable for i in p.categories],
                                  size=[i.serializable for i in p.sizes])
                             for p in products])

    @staticmethod
    def create_cartegory(category, db):
        db.session.add(category)
        db.session.commit()


class Category(db.Model, BaseModel):
    __tablename__ = 'categories'

    name = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)

    @property
    def serializable(self):
        return {'id': self.id, 'name': self.name}


class Color(db.Model, BaseModel):
    __tablename__ = 'colors'

    name = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)

    @property
    def serializable(self):
        return {'id': self.id, 'name': self.name}


class Size(db.Model, BaseModel):
    __tablename__ = 'sizes'

    name = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),
                           nullable=False)

    @property
    def serializable(self):
        return {'id': self.id, 'name': self.name}
