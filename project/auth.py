from flask import Blueprint, render_template, url_for, redirect, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html', user=current_user)

@auth.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()

    if(user):
        if check_password_hash(user.password, password):
            print('login successfull')
            login_user(user, remember=True)
            return redirect(url_for('views.home'))
        else:
            print('No matching Password')
    else:
        print('No matching Email or Password')

    return render_template('login.html', user=current_user)
    

@auth.route('/register')
def register():
    return render_template('register.html', user=current_user)


@auth.route('/register', methods=['POST'])
def register_post():
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()

    if user:
        return redirect(url_for('auth.register'))
    
    new_user = User(email=email, username=username, password=generate_password_hash(password, method='scrypt'))

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))