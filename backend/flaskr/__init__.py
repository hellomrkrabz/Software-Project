from flask import Flask, request, Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2

#db = SQLAlchemy()
app = Flask(__name__)
#POSTGRESQL_URI = "postgres://rwybqwpr:n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU@mouse.db.elephantsql.com/rwybqwpr"

from . import api
app.register_blueprint(api.bp)
'''
connection = psycopg2.connect(POSTGRESQL_URI)
with connection:
    with connection.cursor() as cursor:
        cursor.execute("CREATE TABLE IF NOT EXISTS books (book_id INTEGER, author TEXT, title TEXT);")
    cursor.close()
connection.close()'''

@app.route("/", methods=["GET", "POST"])
def main():
    '''if request.method == "POST":
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO books VALUES (%s, %s, %s);",
                    (
                    request.form.get("b_id"),
                    request.form.get("author"),
                    request.form.get("title"),
                    ),
                )'''
    return "Hello"

if __name__ == '__main__':
   app.run()
