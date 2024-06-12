from flask import Blueprint, render_template, url_for, request
from flask_login import  login_required, current_user
from .models import Card
from . import db
views = Blueprint('views', __name__)

@views.route('/')
@login_required
def home():
    return render_template('index.html', user=current_user)

@views.route('/add_card', methods=['GET', 'POST'])
@login_required
def add_card():
    if request.method == 'POST':
        sport = request.form.get('sport')
        brand = request.form.get('brand')
        set = request.form.get('set')
        player = request.form.get('player')
        year = request.form.get('year')
        numbered = bool(request.form.get('numbered'))
        number = request.form.get('number')
        numberof = request.form.get('numberof')
        graded = bool(request.form.get('graded'))
        gradedby = request.form.get('gradedby')
        grade = request.form.get('grad')

        new_card = Card(sport=sport, brand=brand, set=set, player=player,
                       year=year, numbered=numbered, number=number, numberedto=numberof,
                         graded=graded, gradedby=gradedby, grade=grade, user_id=current_user.id)
        db.session.add(new_card)
        db.session.commit()

        return render_template('index.html', user=current_user)

    return render_template('add_card.html', user=current_user)

@views.route('/edit_card/{id}', methods=['POST'])
@login_required
def edit_card(id):
    
    sport = request.form.get('sport')
    brand = request.form.get('brand')
    set = request.form.get('set')
    player = request.form.get('player')
    year = request.form.get('year')
    numbered = request.form.get('numbered')
    number = request.form.get('number')
    numberedto = request.form.get('numberedto')
    graded = request.form.get('graded')   
    gradedby = request.form.get('gradedby')
    grade = request.form.get('grade')

    

    return render_template('edit_card.html')
