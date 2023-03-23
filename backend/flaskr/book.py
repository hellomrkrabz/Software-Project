from flask import Flask, request
import psycopg2
from . import db
'''
id = 1
POSTGRESQL_URI = "postgres://rwybqwpr:n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU@mouse.db.elephantsql.com/rwybqwpr"

class Book:
    def __init__(self, book_id):
        self.book_id = book_id
        self.book = None

        connection = psycopg2.connect(POSTGRESQL_URI)
        with connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM books WHERE book_id='+book_id+';')
                self.book=cursor.fetchall()
                cursor.close()
        connection.close()

    def get_book(self):
        return self.book

    def get_book_id(self):
        return id

    def get_author(self):
        return self.author

    def get_title(self):
        return self.title
'''

class Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Text)
    title = db.Column(db.Text)

    def get_book_id(self):
        return self.book_id

    def get_author(self):
        return self.author

    def get_title(self):
        return self.title