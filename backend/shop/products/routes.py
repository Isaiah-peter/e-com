from shop import db, app
from flask import make_response, request, jsonify
from shop.admin.models import User
from shop.products.models import Category, Product, Size, Color
import cloudinary
import cloudinary.uploader


@app.route('/category', methods=['GET', 'POST'])
def category():
    if User.auth(User, request):
        if request.method == 'POST':
            if request.is_json:
                data = request.get_json()
                newcat = Category(name=data['name'])
                newcat.product_id = data['product_id']

                db.session.add(newcat)
                db.session.commit(newcat)

                return make_response(jsonify(newcat.to_dict())), 200
            else:
                return {"error": "please input data"}, 404
            
        if request.method == 'GET':
            category = db.engine.execute('SELECT DISTINCT name FROM categories ORDER BY name')
            res = []
            num = 1
            for i in category.all():
                resdict = {}
                resdict['id'] = num
                resdict['name'] = i[0]

                res.append(resdict)

            return make_response(jsonify(res)), 200
                
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
        if type(user) != dict and user.get('seller'):
            return {"error": "Invalid token or Unauthorize user"}, 401

        if request.is_json:
            data = request.get_json()
            product = Product(name=data.get('name'), desc=data.get('desc'),
                              price=float(data.get('price')),
                              in_stock=int(data.get('in_stock')),
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

            return make_response(jsonify({"msg": "sucessfully created"})), 200
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
    category = request.args.get('category')
    size = request.args.get('size')
    color = request.args.get('color')
    new = request.args.get('new')
    if type(user) == dict and user.get('user_id'):
        products = Product.getProduct(db)

        if new and category:
            products = Product.getNewProductAndRelatedClassesName(
                db, Category, category)
        elif category:
            products = Product.getProductByRelatedClassesName(
                db, Category, category)

        if new and size:
            products = Product.getNewProductAndRelatedClassesName(
                db, Size, size)
        elif size:
            products = Product.getProductByRelatedClassesName(db, Size, size)

        if new and color:
            products = Product.getNewProductAndRelatedClassesName(
                db, Color, color)
        elif color:
            products = Product.getProductByRelatedClassesName(db, Color, color)

        if new:
            products = Product.getNewProduct(db)

        return make_response(jsonify(products)), 200
    else:
        return {'error': "token expired or invalid"}, 400


@app.route('/product/<id>', methods=['GET', 'DELETE'])
def getProductById(id):
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return {"error": "no token"}, 400
    else:
        auth_token = auth_header.split(' ')[1]
    user = User.decode_auth_token(auth_token)
    if type(user) == dict and user.get('user_id'):
        if request.method == 'GET':
            product = Product.getProductById(db, id)
            if len(product.get("Product")) == 0:
                return {"error": "no product"}, 400
            return make_response(jsonify(product)), 200
        elif request.method == 'DELETE':
            Product.deleteProduct(db, id)
            return make_response(jsonify({"msg": "Product deleted", "id": id}), 200)

    else:
        return make_response(jsonify({"error": "error getting product"})), 400


@app.route('/upload', methods=['POST'])
def upload():
    file_to_upload = request.files['imageurl']
    print(file_to_upload)
    app.logger.info('%s file_to_upload', file_to_upload)
    upload_image = cloudinary.uploader.upload(file_to_upload)
    print(upload_image)

    return jsonify(upload_image), 200


@app.route('/products/<seller_id>', methods=['GET'])
def seller_product(seller_id):
    auth_header = request.headers.get("Authorization")

    if auth_header is None:
        return {"error": "no token"}, 400
    else:
        auth_token = auth_header.split(' ')[1]
    user = User.decode_auth_token(auth_token)
    print(user)
    if type(user) == dict and user.get('seller'):
        product = Product.getProductBySeller_id(db, seller_id)
        if len(product.get("Product")) == 0:
            return {"error": "no product"}, 400
        return make_response(jsonify(product)), 200

    else:
        return make_response(jsonify({'error': "expired token"})), 400
