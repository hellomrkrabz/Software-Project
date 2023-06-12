from flask import Flask, request
import psycopg2
from . import db
import enum
import base64
import json
from .transaction import Transaction
from sqlalchemy import text, create_engine
from datetime import datetime
engine = create_engine("postgresql://banana_books_user:p5KDYaDuvdp5rwHoVyO9bkH2uXkSedzB@dpg-cgljb682qv24jlvodv40-a.frankfurt-postgres.render.com/banana_books")


class States(enum.Enum):
    mint = 1
    near_mint = 2
    very_good = 3
    good = 4
    fair = 5
    poor = 6

class Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)
    google_book_id = db.Column(db.String(30))
    isbn = db.Column(db.String(150))
    title = db.Column(db.String(300))
    author = db.Column(db.String(120))
    cover_photo = db.Column(db.String(300))
    wanted_books = db.relationship('Wanted_Book',
                            backref='foreign_book',
                            lazy='dynamic',
                            cascade="all, delete")
    owned_books = db.relationship('Owned_Book',
                            backref='book',
                            lazy='dynamic',
                            cascade="all, delete")

    def get_id(self):
        return self.book_id

    def get_google_book_id(self):
        return self.google_book_id

    def get_isbn(self):
        return self.isbn

    def get_title(self):
        return self.title

    def get_author(self):
        return self.author

    def get_cover_photo(self):
        return self.cover_photo

class Owned_Book(db.Model):
    __tablename__ = 'owned_books'
    owned_book_id = db.Column(db.Integer, primary_key=True)
    book_state = db.Column(db.Enum(States))
    rentable = db.Column(db.Boolean)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelves.shelf_id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'))
    transactions = db.relationship('Transaction',
                            backref='transaction',
                            lazy='dynamic',
                            cascade="all, delete")



    def get_id(self):
        return self.owned_book_id

    def get_book_state(self):
        return self.book_state.value

    def get_rentable(self):
        return self.rentable

    def get_shelf_id(self):
        return self.shelf_id

    def get_owner_id(self):
        return self.owner_id

    def get_book_id(self):
        return self.book_id

    def if_no_previous_transaction(self):
        sql = text("""SELECT transaction_id FROM transactions t
        WHERE t.state IN ('accepted_reservation','your_turn', 'dates_chosen',
        'dates_rejected','accepted_date', 'passed_down', 'lent', 'returned') 
        AND t.book_id =""" + str(self.book_id))
        with engine.connect() as con:
            result = con.execute(sql).scalar()
        return result

    def check_if_first_in_queue(self):
        sql = text("""SELECT MIN(tr.reservation_date),tr.state,tr.transaction_id FROM transactions tr 
                GROUP BY tr.transaction_id
                HAVING tr.state='accepted_reservation' AND tr.book_id=""" + str(
            self.book_id) + " ")
        with engine.connect() as con:
            result = con.execute(sql).scalar()
        print("tu ok")
        print(result)
        sql = text("""SELECT transaction_id from transactions where reservation_date='"""+ result.strftime("%a, %d %b %Y %H:%M:%S %Z") + "'")
        print("tu nie")
        with engine.connect() as con:
            result = con.execute(sql).scalar()
            print(result)
        return result


class Wanted_Book(db.Model):
    __tablename__ = 'wanted_books'
    wanted_book_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    foreign_book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'))


    def get_id(self):
        return self.wanted_book_id

    def get_user_id(self):
        return self.user_id

    def get_foreign_book_id(self):
        return self.foreign_book_id


