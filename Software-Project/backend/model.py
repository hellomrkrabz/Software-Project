from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import datetime
app =  Flask(__name__)
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
class BaseModel(db.Model):
    """Base data model for all objects"""
    __abstract__ = True
def __init__(self, *args):
        super().__init__(*args)
def __repr__(self):
        """Define a base way to print models"""
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })
def json(self):
        """
                Define a base way to jsonify models, dealing with datetime objects
        """
        return {
            column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
            for column, value in self._to_dict().items()
        }
class Station(db.Model):
    __tablename__ = 'stations'
    id = db.Column(db.Integer, primary_key = True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

def __init__(self,id,lat,lng):
        self.id = id
        self.lat=lat
        self.lng=lng