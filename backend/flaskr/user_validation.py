from .user import User
from . import db
from flask import Blueprint, g, redirect, request, make_response, session, url_for, jsonify
from werkzeug.security import generate_password_hash
import json
import re
from .email_sender import send_mail_with_msg, send_mail_with_html, send_mail_from_html_file

bp = Blueprint("user_validation", __name__, url_prefix='/user_validation')

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

@bp.route('/register', methods=['POST'])
def Register():
    data = request.get_json()

    email = data['sentEmail']
    password = data['sentPassword']
    confirmPassword = data['confirmPassword']
    avatar = '/avatars/swinior.jpg'

    error = None

    if email == '' or not re.fullmatch(regex, email):
        error = 'No email provided'
    elif password == '' or not password:
        error = 'No password provided'
    elif password != confirmPassword:
        error = 'Passwords don\'t match'

    if error is not None:
        print(error)
        return jsonify({"msg": error})

    try:
        user = User(email=email,
                    password=generate_password_hash(password),
                    avatar=avatar)
        db.session.add(user)
        db.session.commit()
        print(f"User sold data to us without knowing:)")
        send_mail_from_html_file(email, "email confirmation", "email_confirmation.html") #FIXME: email_confirmation.html is just placeholder with image of monke 
        return jsonify({"msg": "WORKING"})
    except Exception as e:
        error = str(e)
        if 'users.email' in error:
            error = "E-mail is already taken"
        else:
            print('[ERROR] ::', error)
            return jsonify({"msg": error})

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['sentEmail']
    password = data['sentPassword']
    print("NICE SUCCESS")

    error = None

    user = User.query.filter_by(email=email).first()

    if user is None:
        error = 'No such user'
    elif not user.verify_password(password):
        error = 'Wrong password'

    if error is None:
        session.clear()
        session['user_id'] = user.get_id()
        print("[INFO]", f"User id: {user.get_id()}")

        resp = jsonify({'user_id': user.get_id(), 'msg': 'logged in'})

        response = make_response(resp)
        response.headers['Access-Control-Allow-Credentials'] = True
        return response, 200

    print(f"error: {error}")
    return jsonify({"msg": error})

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
