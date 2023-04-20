from flask import Blueprint, request, make_response, jsonify
from shop import db, bcrypt
from .models import User

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        hash_password = bcrypt.generate_password_hash(data['password']).decode("utf-8")
        try:
            new_user = User(name=data['name'], username=data['username'] ,email=data['email'],
                    password=hash_password, phone=data['phone'], 
                    profile=data['profile'], is_seller=data['is_seller'])
        
            user = db.session.query(User).filter(User.name == new_user.name).first()
            if user != None:
                responseObject = {
                    'status': 'fail',
                    'message': 'User already exists. Please Log in.',
                }
                return make_response(jsonify(responseObject)), 202
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict()
        except Exception as e:
            responseObject = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 400
    
@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    try:

        user = User.query.filter_by(
            email=data.get('email')
        ).first()
        if user == None:
            responseObject = {
                'status': 'fail',
                'message': 'fail to logged in input the correct email address',
            }
            return make_response(jsonify(responseObject)), 404

        password = data.get('password')


        if bcrypt.check_password_hash(user.password, password) == False:
            responseObject = {
                'status': 'fail',
                'message': 'fail to logged in input the correct password',
            }
            return make_response(jsonify(responseObject)), 404

        response_data = {
            "name": user.name,
            "username": user.username,
            "email": user.email,
            "profile": user.profile,
            "is_seller": user.is_seller,
            "phone": user.phone
        }
        print (response_data)
        auth_token = user.encode_auth_token(user.id)
        print(auth_token)
        if auth_token:
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token,
                "user": response_data,
            }
            return make_response(jsonify(responseObject)), 200
    except Exception as e:
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return make_response(jsonify(responseObject)), 500


@auth.route('/users', methods=['GET'])
def users():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(' ')[1]
    else:
        responsedata = {
            "error": "please login or register"
        }

        return make_response(jsonify(responsedata)), 404
    
    if auth_token:
        user = User.decode_auth_token(auth_token=auth_token)
        print(user)
    
    if type(user) == dict and user.get('user_id') and user.get('seller'):
        all_users = User.query.all()
        user_data = dict(Users=[p.serializable for p in all_users])
        return make_response(jsonify(user_data)), 200
    else:
        responsedata = {
            "error": "you are not authorized" 
        }

        return make_response(jsonify(responsedata)), 404

@auth.route('/user/<id>', methods=["GET"])
def user(id): 
    user = db.session.query(User).get_or_404(id)

    if user is None:
        res = {
            "error": "user does not exist"
        }

        return make_response(jsonify(res)), 401
    return make_response(jsonify(user.serializable)), 200
