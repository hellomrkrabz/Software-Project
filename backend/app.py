from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import psycopg2


app = Flask(__name__)
POSTGRESQL_URI = "postgres://rwybqwpr:n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU@mouse.db.elephantsql.com/rwybqwpr"

connection = psycopg2.connect(POSTGRESQL_URI)
with connection:
    with connection.cursor() as cursor:
        cursor.execute("CREATE TABLE IF NOT EXISTS books (book_id INTEGER, author TEXT, title TEXT);")


@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO books VALUES (%s, %s, %s);",
                    (
                    request.form.get("book_id"),
                    request.form.get("author"),
                    request.form.get("title"),
                    ),
                )
    return "Hello"

if __name__ == '__main__':
   app.run()