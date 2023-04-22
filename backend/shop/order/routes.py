from shop import db, app
from flask import make_response, request, jsonify
from shop.admin.models import User
from shop.order.models import Order, OrderQty, Address


@app.route('/order', methods=['GET', 'POST'])
def orders():
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    print(user)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400
    if request.method == 'POST':
        data = request.get_json()
        if request.is_json:
            order = Order(amount=data.get('amount'),
                          status=data.get('status'), user_id=user.get('user_id'))

            db.session.add(order)
            db.session.commit()

            if data.get('address'):
                for i in data.get('address'):
                    address = Address(address=i.get('address'),
                                      user_id=user.get('user_id'), order_id=order.id)

                    db.session.add(address)
                    db.session.commit()
            if data.get('orderqty'):
                for i in data.get('orderqty'):
                    orderqty = OrderQty(quantity=i.get(
                        'quantity'), cart_id=i.get('cart_id'), order_id=order.id)

                    db.session.add(orderqty)
                    db.session.commit()


            return make_response(jsonify(order.serializable)), 200
        else:
            return {"error": "please input data"}, 400

    if request.method == "GET":
        result = Order.GetOrders(db)
        return make_response(jsonify(result)), 200


@app.route('/order/<id>', methods=['GET', 'DELETE', 'PUT'])
def order(id):
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    print(user)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400

    if request.method == 'GET':
        result = Order.GetOrder(db, id)
        return make_response(jsonify(result)), 200

    if request.method == 'DELETE':
        order = Order.query.get(id)
        db.session.delete(order)
        db.session.commit()
        return {"msg": "success"}
        
    if request.method == 'PUT':
        order = Order.query.get(id)
        if order is None:
            return make_response(jsonify({'error':'order not found'})), 400
        data = request.get_json()
        
        if data.get('status'):
            order.quantity = data.get('status')
        db.session.commit()
        return make_response(jsonify({'msg':'done'})), 200
    
@app.route('/addresses', methods=['GET'])
def address():
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(' ')[1]

    user = User.decode_auth_token(auth_token=auth_token)
    if type(user) != dict:
        return {"error": "token as expired or invalid"}, 400
    
    address = Address.query.filter(Address.user_id == user.get('user_id')).all()
    res = dict(Address=[dict(a.serializable) for a in address] )
    return make_response(jsonify(res)), 200




