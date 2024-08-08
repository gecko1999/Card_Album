from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    cards = db.relationship('Card')

class Card(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    sport = db.Column(db.String)
    brand = db.Column(db.String)
    set = db.Column(db.String)
    year = db.Column(db.Integer)
    player = db.Column(db.String)
    team = db.Column(db.String)
    numbered = db.Column(db.Boolean, default = False)
    number = db.Column(db.Integer, nullable=True)
    numberedto = db.Column(db.Integer,nullable=True)
    graded = db.Column(db.Boolean, default = False)
    gradedby = db.Column(db.String, nullable=True)
    grade = db.Column(db.Double, nullable=True)
    linktopic = db.Column(db.String, nullable=False, default="images/picture_not_found.jpg")
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


