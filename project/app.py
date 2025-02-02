from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from config import ApplicationConfig
from flask_session import Session
from flask_cors import CORS, cross_origin
from models import db, User, Card
from uuid import uuid4
import os

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

cors = CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
server_session = Session(app)
db.init_app(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}



with app.app_context():
    db.create_all()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_uuid():
    return uuid4().hex

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
    counter = 0
    if request.method == 'POST':
        sport = request.form.get('sport')
        brand = request.form.get('brand')
        set = request.form.get('set')
        player = request.form.get('player')
        team = request.form.get('team')
        year = request.form.get('year')
        numbered = bool(request.form.get('numbered'))
        number = request.form.get('number')
        numberof = request.form.get('numberof')
        graded = bool(request.form.get('graded'))
        gradedby = request.form.get('gradedby')
        grade = request.form.get('grad')
        image = request.files.get('image')
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        user = User.query.filter_by(id=user_id).first()
        username = user.username
        path= 'F:/Dokumente/Football Karten Projekt/react/client/src/pages/images'

        full_path = os.path.join(path, username)

        if not os.path.exists(full_path):
            os.chdir(path)
            os.mkdir(username)

        if image and allowed_file(image.filename):
            filename = user_id + str(get_uuid()) + ".jpg"
            savename=os.path.join(full_path, filename)
            image.save(savename)
            link="images/" + user.username + "/" + filename 

            new_card = Card(sport=sport, brand=brand, set=set, player=player, team=team,
                           year=year, numbered=numbered, number=number, numberedto=numberof,
                             graded=graded, gradedby=gradedby, grade=grade, user_id=user_id, linktopic=link)
        else:
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
        
        filter_field = request.json.get('filter_field')
        filter_value = request.json.get('filter_value')

        query = Card.query.filter_by(user_id=user_id)

        if filter_field and filter_value:
            query = query.filter(getattr(Card, filter_field) == filter_value)

        cards = query.all()

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

@app.route('/update_card/<cardId>', methods=['GET', 'PUT'])
def get_card_by(cardId):
    
    cardIdReact = cardId

    if request.method == 'GET':
        
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"message": "Unauthorized"}), 404

        card = Card.query.get(cardIdReact)
        print(cardIdReact)

        if not card:
            return jsonify({"message": "Card not exists"}), 401

        return jsonify({"id": card.id,
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
                "linktopic": card.linktopic})
    
    if request.method == 'PUT':
        
        data = request.json

        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"message": "Unauthorized"}), 404


        card = Card.query.get(cardIdReact)
        print(cardIdReact)
        print(card)
        if not card:
            return jsonify({"message": "Card not exists"}), 404
        
        image = request.files.get('image')
        user_id = session.get("user_id")
        

        card.sport = data.get('sport', card.sport).upper()
        card.brand = data.get('brand', card.brand)
        card.set = data.get('set', card.set)
        card.player = data.get('player', card.set)
        card.team = data.get('team', card.team)
        card.year = data.get('year', card.year)
        card.numbered = data.get(bool('numbered'), card.numbered)
        card.number = data.get('number', card.number) 
        card.numberedto = data.get('numberof', card.numberedto) 
        card.graded = data.get(bool('graded'), card.graded)
        card.gradedby = data.get('gradedby', card.gradedby) 
        card.grade = data.get('grade', card.grade)
        card.image = image 
        card.user_id = user_id 

        db.session.commit()

        return jsonify({"message": "change sucessfully"}), 200




@app.route('/delete_card', methods=['DELETE'])
def delete_card():
    user_id = session.get("user_id")

    card_id = request.json.get('id')

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 404
    
    card = Card.query.get(card_id)

    if card:
        try:
            db.session.delete(card)
            db.session.commit()
            return jsonify({"message": "deleted succesfully"}, 200)
        except Exception as e:
            return(jsonify({"message": str(e)}), 400)

@app.route('/get_filter', methods=['POST'])
def get_filter():
    
    filter_field = request.json.get('filter_field')
    print(filter_field)
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"message": "Unauthoried"}), 404

    distinct_values = db.session.query(getattr(Card, filter_field)).filter_by(user_id=user_id).distinct().all()

    filter_list = [value[0] for value in distinct_values]
    print(filter_list)
    return jsonify(filter_list), 200




if __name__ == "__main__":
    app.run(debug=True)
