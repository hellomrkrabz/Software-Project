from flask import Flask, request, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from flask_cors import CORS
from .config import config
import os

db = SQLAlchemy()


'''app = Flask(__name__)
CORS(app)

from . import api
app.register_blueprint(api.bp)

@app.route("/", methods=["GET", "POST"])
def main():
    return "Hello"

if __name__ == '__main__':
   app.run()
'''

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_object(config['development'])
    config['development'].init_app(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # blueprint responsible for fetching some data from the API
    from . import api
    app.register_blueprint(api.bp)


    db.init_app(app)

    # create database tables
    with app.app_context():
        db.create_all()

    return app
