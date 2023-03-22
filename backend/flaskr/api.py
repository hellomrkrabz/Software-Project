from flask import Blueprint, jsonify
from .book import Book

bp = Blueprint("api", __name__, url_prefix='/api')

@bp.route('/bookinfo/<book_id>', methods=['GET'])
def get_book_info(book_id):
    book = Book
    print('HALLOOOOOO')
    '''book = Book.query.filter_by(id=book_id).first()
    if book is not None:
        return jsonify({
            'book_id': book.get_book_id(),
            'author': book.get_author(),
            'title': book.get_title()
        })'''
    #return jsonify({'msg': 'Specified book does not exist:('})
    return jsonify({'msg': book.get_book_id(book)})