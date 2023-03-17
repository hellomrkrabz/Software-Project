from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

POSTGRES = {
 'user': 'rwybqwpr',
 'pw': 'n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU',
 'db': 'rwybqwpr',
 'host': 'mouse.db.elephantsql.com',
 'port': '5432',
}

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
db = SQLAlchemy(app)
#db.init_app(app)
from model import db, Station


@app.route("/")
def main():
 result = Station(1,1.253,3.256)
 db.session.add(result)
 db.session.commit()
 return "Hello"

if __name__ == '__main__':
 app.run()