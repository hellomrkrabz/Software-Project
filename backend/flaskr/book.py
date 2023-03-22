from flask import Flask, request
import psycopg2

id = 1
POSTGRESQL_URI = "postgres://rwybqwpr:n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU@mouse.db.elephantsql.com/rwybqwpr"
'''
connection = psycopg2.connect(POSTGRESQL_URI)
with connection:
    with connection.cursor() as cursor:
        #cursor.execute("CREATE TABLE IF NOT EXISTS books (book_id INTEGER, author TEXT, title TEXT);")
        #cursor.execute("INSERT INTO books VALUES (1, 'test', 'testbook');")
        id = cursor.execute("SELECT book_id FROM books WHERE title = 'testbook';")

    cursor.close()
connection.close()
'''
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