from flask import Flask, request
import psycopg2
from . import db
from datetime import datetime
from .report import Report
from sqlalchemy import text, create_engine, ForeignKey
engine = create_engine("postgresql://banana_books_user:p5KDYaDuvdp5rwHoVyO9bkH2uXkSedzB@dpg-cgljb682qv24jlvodv40-a.frankfurt-postgres.render.com/banana_books")

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    visible = db.Column(db.Boolean)
    content = db.Column(db.String(500))
    date = db.Column(db.DateTime, default=datetime.date)
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id')) #opinion is about this user
    renter_id = db.Column(db.Integer, db.ForeignKey('users.id')) #opinion author
    reported = db.Column(db.Boolean)
    borrower = db.relationship('User',
                              foreign_keys=[borrower_id])
    renter = db.relationship('User',
                              foreign_keys=[renter_id])

    def get_id(self):
        return self.review_id

    def get_rating(self):
        return self.rating

    def get_visibility(self):
        return self.visible

    def get_content(self):
        return self.content

    def get_reported(self):
        return self.reported

    def get_renter_id(self):
        return self.renter_id

    def get_date(self):
        return self.date

    def get_author_username(self):
        sql = text("""SELECT username FROM users u JOIN reviews r ON u.id = r.renter_id
        WHERE r.renter_id = """ + str(self.renter_id))
        with engine.connect() as con:
            result = con.execute(sql).scalar()
        return result



