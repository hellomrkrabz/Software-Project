from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


#db = SQLAlchemy(app)
#db.init_app(app)
from model import db, Station


@app.route("/")
def main():
 result = Station()
 db.session.add(result)
 #db.session.commit()
 return "Hello"

if __name__ == '__main__':
   app.run()