from flask import abort, request, redirect, url_for
from shop import app, db, bcrypt
from .models import User


@app.route('/')
def home():
    print("home")
    return "Home"


@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        hash_password = bcrypt.generate_password_hash(data['password'])
        try:
            new_user = User(name=data['name'], username=data['username'] ,email=data['email'],
                        password=hash_password, phone=data['phone'], 
                        profile=data['profile'], is_seller=data['is_seller'])
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict()
        
        except KeyError() as e:
            abort(404)
    else:
        return "please enter your data"
    
@app.route("/login", methods=["POST"])
def login():
    pass