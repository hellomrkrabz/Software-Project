from flask import Blueprint, jsonify, request, Response
from .book import Owned_Book
from .book import Wanted_Book
from .book import Book
from .user import User
from .shelf import Shelf
from .room import Room
from .review import Review
from .transaction import Transaction
from . import db
import json

bp = Blueprint("api", __name__, url_prefix='/api')

#---------------------info about books---------------------------

@bp.route('/owned_book_info', methods=['GET'])
def get_owned_books():
    books = Owned_Book.query.all()
    books_json = [{
        'owned_book_id': b.get_id(),
        'book_state': b.get_book_state(),
        'rentable': b.get_rentable(),
        'owner_id': b.get_owner_id(),
        'shelf_id': b.get_shelf_id(),
        'book_id': b.get_book_id()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/wanted_book_info', methods=['GET'])
def get_wanted_books():
    books = Wanted_Book.query.all()
    books_json = [{
        'wanted_book_id': b.get_id(),
        'owner_id': b.get_user_id(),
        'foreign_book_id': b.get_foreign_book_id()
    }for b in books]

    return jsonify({'books': books_json})

@bp.route('/book_info/<b_id>', methods=['GET'])
def get_book_info(b_id):
    book = Book.query.filter_by(book_id=b_id).first()
    if book is not None:
        return jsonify({
            'book_id': book.get_id(),
            'google_book_id': book.get_google_book_id(),
            'isbn': book.get_isbn(),
            'title': book.get_title(),
            'author': book.get_author(),
            'cover_photo': book.get_cover_photo()
        })
    return jsonify({'msg': 'Specified book does not exist:('})

@bp.route('/owned_book_test/<u_id>', methods=['GET'])
def get_book_info_test(u_id):
    user = User.query.filter_by(id=u_id).first()
    if user is not None:
        list = user.get_book_info()
        if list is not None:
            for book_id in list:
                book = Owned_Book.query.filter_by(book_id=book_id).first()
                if book is not None:
                    return jsonify({
                        'book_id': book.get_book_id(),
                        'author': book.get_author(),
                        'title': book.get_title()
                    })
    return jsonify({'msg': 'No books?:('})

#---------------------info about users---------------------------

@bp.route('/user_info', methods=['GET'])
def get_users():
    users = User.query.all()
    print(users)
    users_json = [{
        'id': u.get_id(),
        'email': u.get_email(),
        'username': u.get_username(),
        'password': u.get_password(),
        'avatar': u.get_avatar(),
        'key': u.get_key(),
        'phone_number': u.get_phone_number(),
        'city': u.get_city(),
        'details': u.get_details()
    }for u in users]

    return jsonify({'users': users_json})


@bp.route('/user/<id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.filter_by(id=id).first()
    print(user)
    if user is not None:
        user_json = {
            'id': user.get_id(),
            'email': user.get_email(),
            'username': user.get_username(),
            'password': user.get_password(),
            'avatar': user.get_avatar(),
            'key': user.get_key()
        }
    else:
        user_json = {
            'error': 'No such user'
        }
    return jsonify({'user': user_json})

@bp.route('/user_info/<username>', methods=['GET'])
def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    rating = str(user.get_user_rating())
    if user is not None:
        user_json = {
            'id': user.get_id(),
            'email': user.get_email(),
            'username': user.get_username(),
            'password': user.get_password(),
            'avatar': user.encode_avatar(),
            'key': user.get_key(),
            'phone_number': user.get_phone_number(),
            'city': user.get_city(),
            'details': user.get_details(),
            'average_rating': rating
        }
    else:
        user_json = {
            'error': 'No such user'
        }
    return jsonify({'user': user_json})

#---------------------info about rooms & shelves---------------------------

@bp.route('/owned_rooms/<username>', methods=['GET'])
def get_owned_rooms(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        list = user.get_room_info()
        room_list = []
        if list is not None:
            for room_id in list:
                room = Room.query.filter_by(room_id=room_id).first()
                room_list.append(room)
            room_json = [{
                'id': r.get_id(),
                'name': r.get_room_name(),
                'owner': r.get_owner_id()
            } for r in room_list]
            return jsonify({'rooms': room_json})
    return jsonify({'msg': 'No rooms?:('})

@bp.route('/get_rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    rooms_json = [{
        'id': r.get_id(),
        'name': r.get_room_name(),
        'owner': r.get_owner_id()
    }for r in rooms]

    return jsonify({'rooms': rooms_json})


@bp.route('/owned_shelves/<username>', methods=['GET'])
def get_owned_shelves(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        input_list = user.get_shelf_info()
        shelf_list = []
        if input_list is not None:
            for shelf_id in input_list:
                shelf = Shelf.query.filter_by(shelf_id=shelf_id).first()
                shelf_list.append(shelf)
            shelf_json = [{
                'id': s.get_id(),
                'name': s.get_shelf_name(),
                'room': s.get_room_id()
            } for s in shelf_list]
            return jsonify({'shelves': shelf_json})
    return jsonify({'msg': 'No shelves?:('})

@bp.route('/get_shelves', methods=['GET'])
def get_shelves():
    shelves = Shelf.query.all()
    shelves_json = [{
        'id': s.get_id(),
        'name': s.get_shelf_name(),
        'room': s.get_room_id()
    }for s in shelves]

    return jsonify({'shelves': shelves_json})



#---------------------transaction stuff---------------------------

@bp.route('/transactions/<username>', methods=['GET'])
def get_user_transactions(username):
    user = User.query.filter_by(username=username).first();
    if user is not None:
        transactions = Transaction.query.filter_by(borrower_id=user.id);
        if transactions is not None:
            transactions_json = [{
                'id': t.get_transaction_id(),
                'reservation date': t.get_reservation_date(),
                'rent date': t.get_rent_date(),
                'return date': t.get_return_date(),
                'state': t.get_state(),
                'book id': t.get_book_id(),
                'borrower id': t.get_borrower_id()
            } for t in transactions]
            return jsonify({'transactions': transactions_json})
    return jsonify({'msg': 'it no good'})

@bp.route('/transaction/<username>/<t_id>', methods=['GET'])
def get_transaction(username, t_id):
   user = User.query.filter_by(username=username).first()
   if user is not None:
       transaction = Transaction.query.filter_by(borrower_id=user.id).filter_by(transaction_id=t_id).first();
       if transaction is not None:
        transaction_json = {
            'id': transaction.get_transaction_id(),
            'reservation date': transaction.get_reservation_date(),
            'rent date': transaction.get_rent_date(),
            'return date': transaction.get_return_date(),
            'state': transaction.get_state(),
            'book id': transaction.get_book_id(),
            'borrower id': transaction.get_borrower_id()
        }
        return jsonify({'transaction': transaction_json})
   return jsonify({'msg': 'it no good'})

@bp.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all();
    if transactions is not None:
        transaction_json = [{
            'id': t.get_transaction_id(),
            'reservation date': t.get_reservation_date(),
            'rent date': t.get_rent_date(),
            'return date': t.get_return_date(),
            'state': t.get_state(),
            'book id': t.get_book_id(),
            'borrower id': t.get_borrower_id()
        } for t in transactions]
        return jsonify({'transactions': transaction_json})
    return jsonify({'msg': 'it no good'})


#---------------------adding things---------------------------

@bp.route('/<entity_type>/<action>', methods=['POST'])
def add_or_edit_entity(entity_type, action):
    data = request.get_json()
    entity_type = str(entity_type)
    entity = None
    entity2 = None
    user = User.query.filter_by(key=data['user_key']).first()

    try:
        if entity_type == 'owned_book':
            book = data['book']
            book_id = book['googleId']
            title = book['title']
            author = book['author']
            isbn = book['ISBN']
            cover_photo = book['src']
            book_state = data['book_state']
            rentable = data['rentable']
            shelf_id = data['shelf_id']

            book_in_db = Book.query.filter_by(google_book_id=book_id).first()
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add" and book_in_db is not None:
                entity = Owned_Book(
                    book_id=book_in_db.book_id,
                    book_state=book_state,
                    rentable=rentable,
                    shelf_id=shelf_id,
                    owner_id=owner_id
                )
            elif action == "add" and book_in_db is None:
                    entity2 = Book(
                        google_book_id = book_id,
                        isbn = isbn,
                        title = title,
                        author = author,
                        cover_photo = cover_photo
                    )
                    db.session.add(entity2)
                    db.session.commit()
                    book_in_db = Book.query.filter_by(google_book_id=book_id).first()
                    entity = Owned_Book(
                        book_id=book_in_db.book_id,
                        book_state=book_state,
                        rentable=rentable,
                        shelf_id=shelf_id,
                        owner_id=owner_id
                    )

            elif action == "edit":
                entity = Owned_Book.query.filter_by(id=data['id']).first()
                entity.book_id = book_id
                entity.book_state = book_state
                entity.rentable = rentable
                entity.shelf_id = shelf_id
                entity.owner_id = owner_id

        elif entity_type == 'wanted_book':
            book = data['book']
            book_id = book['googleId']
            title = book['title']
            author = book['author']
            isbn = book['ISBN']
            cover_photo = book['src']

            book_in_db = Book.query.filter_by(google_book_id=book_id).first()
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add" and book_in_db is not None:
                entity = Wanted_Book(
                    user_id=owner_id,
                    foreign_book_id = book_in_db.book_id
                )
            elif action == "add" and book_in_db is None:
                    entity2 = Book(
                        google_book_id = book_id,
                        isbn = isbn,
                        title = title,
                        author = author,
                        cover_photo = cover_photo
                    )
                    db.session.add(entity2)
                    db.session.commit()
                    book_in_db = Book.query.filter_by(google_book_id=book_id).first()
                    entity = Wanted_Book(
                        user_id=owner_id,
                        foreign_book_id=book_in_db.book_id
                    )

        elif entity_type == 'shelf':
            shelf_name = data['shelf_name']
            room_id = data['room_id']

            if action == "add":
                entity = Shelf(
                    shelf_name=shelf_name,
                    room_id=room_id
                )
            elif action == "edit":
                entity = Shelf.query.filter_by(id=data['id']).first()
                entity.shelf_name = shelf_name
                entity.room_id = room_id

        elif entity_type == 'room':
            room_name = data['room_name']
            user = User.query.filter_by(key=data['user_key']).first()
            owner_id = user.id

            if action == "add":
                entity = Room(
                    room_name=room_name,
                    owner_id=owner_id
                )
            elif action == "edit":
                entity = Room.query.filter_by(id=data['id']).first()
                entity.room_name = room_name

        elif entity_type == 'review':
            rating = data['rating']
            visible = data['visible']
            content = data['content']
            borrower_id = data['borrower_id']
            renter_id = data['renter_id']

            if action == "add":
                entity = Review(
                    rating=rating,
                    visible=visible,
                    content=content,
                    borrower_id=borrower_id,
                    renter_id=renter_id
                )
            elif action == "edit":
                entity = Review.query.filter_by(id=data['id']).first()
                entity.rating = rating
                entity.visible = visible
                entity.content = content

            elif entity_type == 'transaction':
                reservation_date = data['reservation_date']
                rent_date = data['rent_date']
                return_date = data['return_date']
                state = data['state']
                book_id = data['book_id']
                borrower_id = data['borrower_id']

                if action == "add":
                    entity = Transaction(
                        reservation_date=reservation_date,
                        rent_date='null',
                        return_date='null',
                        state='reservation',
                        book_id=book_id,
                        borrower_id=borrower_id
                    )
                elif action == "edit":
                    entity = Transaction.query.filter_by(id=data['id']).first()
                    entity.rent_date = rent_date
                    entity.return_date = return_date
                    entity.state = state

        else:
            print(f"[ERROR] :: Unknown entity type: {entity_type}")
            return jsonify({'msg': f"Unknown entity type: {entity_type}"})

        if action == "add":
            db.session.add(entity)
            #if entity2 is not None:
             #   db.session.add(entity2)
        db.session.commit()
        print(f"[INFO] Action '{action}' on {entity} performed successfully")
        return jsonify({"msg": "success", "id": entity.get_id()})
    except Exception as e:
        error = str(e)
        print('[ERROR] :: Failed to add/edit post. Cause:', error)
        return jsonify({'msg': error})