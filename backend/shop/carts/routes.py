from shop import db, app
from flask import make_response, request, jsonify
from shop.admin.models import User
from shop.carts.models import Cart, ProductQty


@app.route('/carts', methods=['POST'])
def create_cart():
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    print(user)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400

    if request.is_json:
        data = request.get_json()

        cart = Cart(totalprice=data.get('totalprice'),
                    quantity=data.get('quantity'),
                    user_id=user.get("user_id"))

        db.session.add(cart)
        db.session.commit()

        if data['productqties']:
            for i in data.get("productqties"):
                productqties = ProductQty()
                productqties.cart_id = cart.id
                productqties.product_id = i.get('product_id')
                productqties.quantity = i.get('quantity')
                productqties.color = i.get('color')
                productqties.size = i.get('size')

        db.session.add(productqties)
        db.session.commit()

        return make_response(jsonify(cart.serializable)), 200
    else:
        return {"error": "please input data"}, 400


@app.route('/carts', methods=['GET'])
def carts():
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400
    carts = Cart.GetCarts(db)
    return make_response(jsonify(carts)), 200


@app.route('/cart/<id>', methods=['GET', 'PUT', 'DELETE'])
def cart(id):
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400

    cart = Cart.query.get(id)

    if request.method == 'PUT':
        data = request.get_json()
        if data.get('quantity'):
            cart.quantity = int(data['quantity'])

        if data.get('totalprice'):
            cart.totalprice = float(data['totalprice'])

        db.session.commit()
        result = {
            "msg": "success",
            'id': cart.id
        }

        return make_response(jsonify(result)), 200
    if request.method == 'GET':
        result = dict(cart.serializable, product_qties=[i.serializable for i in cart.product_qties])
        return make_response(jsonify(result)), 200
    if request.method == 'DELETE':
        db.session.delete(cart)
        db.session.commit()

        return {'success': True, 'id': cart.id}, 200
    
@app.route('/update_productqties/<id>', methods=['PUT'])
def update_productqties(id):
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400
    
    data = request.get_json()
    productqties = ProductQty.query.get(id)

    if data.get('ordered'):
        productqties.ordered = data.get('ordered')
    
    if data.get('quantity'):
        productqties.quantity = int(data['quantity'])
    
    if data.get('color'):
        productqties.color = data['color']
    
    if data.get('size'):
        productqties.size = data['size']

    db.session.commit()
    return {"msg": "done"}, 200
