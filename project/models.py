from . import db
from flask_login import  UserMixin
from sqlalchemy.sql import func


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sport = db.Column(db.String)
    brand = db.Column(db.String)
    set = db.Column(db.String)
    year = db.Column(db.Integer)
    player = db.Column(db.String)
    numbered = db.Column(db.Boolean, default = False)
    number = db.Column(db.Integer)
    numberedto = db.Column(db.Integer)
    graded = db.Column(db.Boolean, default = False)
    gradedby = db.Column(db.String)
    grade = db.Column(db.Double)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(1000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    cards = db.relationship('Card')

