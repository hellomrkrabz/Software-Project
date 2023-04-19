from flask import Flask, request
import psycopg2
from . import db

class Review(db.Model):
    __tablename__ = 'reviews'
    review_id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    visible = db.Column(db.Boolean)
    content = db.Column(db.String(500))
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    renter_id = db.Column(db.Integer, db.ForeignKey('rooms.owner_id'))

    def get_review_id(self):
        return self.review_id

    def get_rating(self):
        return self.rating

    def get_visibility(self):
        return self.visible

    def get_content(self):
        return self.content

