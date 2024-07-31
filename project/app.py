from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from config import AplicationConfig
from flask_session import Session
from flask_cors import CORS, cross_origin
from models import db, User, Card

app = Flask(__name__)
app.config.from_object(AplicationConfig)

cors = CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/register', methods=['POST'])
def register_post():
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()

    if user:
        return (jsonify({"mesage": "user already exisists"}), 400)
    
    new_user = User(email=email, username=username, password=generate_password_hash(password, method='scrypt'))
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return(jsonify({"message": str(e)}), 400)
    
    return(jsonify({"message": "User created"}), 201)

@app.route('/login', methods=['POST'])
def login_post():
    username = request.json['username']
    password = request.json['password']

    user = User.query.filter_by(username=username).first()

    if(user):
        if check_password_hash(user.password, password):
            session["user_id"] = user.id
            return jsonify({
                "message": "Login sucessful"
                }),200
        else:
            return jsonify({"error": "Unauthorized"}), 401
    else:
        return jsonify({"error": "Unauthorized"}), 401
    
@app.route('/logout', methods=["POST"])
def logout_user():
    session.pop("user_id")
    return jsonify({"message": "Logout successful"}), 200

@cross_origin
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username
    })

@app.route('/add_card', methods=['GET', 'POST'])
def add_card():
    if request.method == 'POST':
        sport = request.json('sport')
        brand = request.json('brand')
        set = request.json('set')
        player = request.json('player')
        year = request.json('year')
        numbered = bool(request.json('numbered'))
        number = request.json('number')
        numberof = request.json('numberof')
        graded = bool(request.json('graded'))
        gradedby = request.json('gradedby')
        grade = request.json('grad')

        new_card = Card(sport=sport, brand=brand, set=set, player=player,
                       year=year, numbered=numbered, number=number, numberedto=numberof,
                         graded=graded, gradedby=gradedby, grade=grade, user_id=session.get("user_id"))
        db.session.add(new_card)
        db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)