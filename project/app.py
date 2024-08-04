from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from config import ApplicationConfig
from flask_session import Session
from flask_cors import CORS, cross_origin
from models import db, User, Card

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

cors = CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
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

@app.route('/add_card', methods=['POST'])
def add_card():
    if request.method == 'POST':
        sport = request.json.get('sport')
        brand = request.json.get('brand')
        set = request.json.get('set')
        player = request.json.get('player')
        team = request.json.get('team')
        year = request.json.get('year')
        numbered = bool(request.json.get('numbered'))
        number = request.json.get('number')
        numberof = request.json.get('numberof')
        graded = bool(request.json.get('graded'))
        gradedby = request.json.get('gradedby')
        grade = request.json.get('grad')
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        new_card = Card(sport=sport, brand=brand, set=set, player=player, team=team,
                       year=year, numbered=numbered, number=number, numberedto=numberof,
                         graded=graded, gradedby=gradedby, grade=grade, user_id=user_id)
        
        try:
            db.session.add(new_card)
            db.session.commit()
            return jsonify({"message": "added succesfully"}, 200)
        except Exception as e:
            return(jsonify({"message": str(e)}), 400)

@app.route('/get_card', methods=['POST'])
def get_card():
    if request.method == 'POST':
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401
        
        cards = Card.query.filter_by(user_id=user_id).all()

        if not cards:
            return jsonify({"message": "No Card found"}), 404
        
        cards_list = []
        for card in cards:
            cards_list.append({
                "id": card.id,
                "sport": card.sport,
                "brand": card.brand,
                "set": card.set,
                "player": card.player,
                "team": card.team,
                "year": card.year,
                "numbered": card.numbered,
                "number": card.number,
                "numberedto": card.numberedto,
                "graded": card.graded,
                "gradedby": card.gradedby,
                "grade": card.grade,
                "linktopic": card.linktopic
            })

        return jsonify(cards_list), 200


if __name__ == "__main__":
    app.run(debug=True)