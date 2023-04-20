from shop import db, app
from flask import make_response, request, jsonify
from shop.admin.models import User
from shop.products.models import Category, Product, Size, Color


@app.route('/category', methods=['GET', 'POST'])
def category():
    if User.auth(request):
        if request.is_json:
            data = request.get_json()
            newcat = Category(name=data['name'])
            newcat.product_id = data['product_id']

            db.session.add(newcat)
            db.session.commit(newcat)

            return make_response(jsonify(newcat.to_dict())), 200
        else:
            return {"error": "please input data"}, 404
    else:
        return {"error": "you are not authorized to create this"}, 401


@app.route('/product', methods=['POST'])
def product_create():
    auth_header = request.headers.get('Authorization')
    if auth_header is None:
        return {"error": "please input a token"}, 401
    auth_token = auth_header.split(' ')[1]

    if auth_token:
        user = User.decode_auth_token(auth_token=auth_token)
        if type(user) != dict and user.seller:
            return {"error": "Invalid token or Unauthorize user"}, 401

        if request.is_json:
            data = request.get_json()
            print(data)
            product = Product(name=data.get('name'), desc=data.get('desc'),
                              price=data.get('price'),
                              in_stock=data.get('in_stock'),
                              imageurl=data.get('imageurl'),
                              seller_id=user.get("user_id"),
                              longname=data.get('longname'))

            db.session.add(product)
            db.session.commit()

            if data.get('categories'):
                for i in data.get("categories"):
                    category = Category(name=i.get('name'),
                                        product_id=product.id)
                    Product.create_cartegory(category=category, db=db)

            if data.get('colors'):
                for i in data.get("colors"):
                    category = Color(name=i.get('name'), product_id=product.id)
                    Product.create_cartegory(category=category, db=db)

            if data.get('sizes'):
                for i in data.get("sizes"):
                    category = Size(name=i.get('name'), product_id=product.id)
                    Product.create_cartegory(category=category, db=db)

            user = User.query.filter_by(id=user.get("user_id")).first()
            print(user)

            res = {
                "id": product.id,
                "name": product.name,
                "longname": product.longname,
                "imageurl": product.imageurl,
                "price": product.price,
                "in_stock": product.in_stock,
                "seller_name": user.name,
                "seller_imageurl": user.profile,

            }
            return make_response(jsonify(res)), 200
        else:
            return {"error": "please add data"}


@app.route("/products/list", methods=["GET"])
def products_lists():
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return {"error": "no token"}, 400
    else:
        auth_token = auth_header.split(' ')[1]
    user = User.decode_auth_token(auth_token)
    print(user)
    category = request.args.get('category')
    size = request.args.get('size')
    color = request.args.get('color')
    new = request.args.get('new')
    if type(user) == dict and user.get('user_id'):
        products = Product.getProduct(db)

        if new and category:
            print ("weldone")
            products = Product.getNewProductAndRelatedClassesName(db, Category, category)
        elif category:
            print("leater")
            products = Product.getProductByRelatedClassesName(db, Category , category)

        if new and size:
            products = Product.getNewProductAndRelatedClassesName(db, Size, size)
        elif size:
            products = Product.getProductByRelatedClassesName(db, Size , size)

        if new and color:
            products = Product.getNewProductAndRelatedClassesName(db, Color, color)
        elif color:
            products = Product.getProductByRelatedClassesName(db, Color , color)
            
        if new:
            products = Product.getNewProduct(db)
   
       
        return make_response(jsonify(products)), 200
    else:
        return {'error': "token expired or invalid"}, 400
