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

    error = None

    if email == '' or not re.fullmatch(regex, email):
        error = 'No email provided'
    elif password == '' or not password:
        error = 'No password provided'

    if error is not None:
        print(error)
        return jsonify({"msg": error})

    try:
        user = User(email=email,
                    password=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()
        print(f"User sold data to us without knowing:)")
        send_mail_from_html_file(email, "email confirmation", "email_confirmation.html") #FIXME: email_confirmation.html is just placeholder with image of monke 
        return jsonify({"msg": "WORKING"})
    except Exception as e:
        error = str(e)
        if 'users.email' in error:
            error = f"E-mail {email} is already taken"
        else:
            print('[ERROR] ::', error)
            return jsonify({"msg": error})