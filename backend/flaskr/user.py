from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_utils import EmailType

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True, index=True)
    password = db.Column(db.String(128))

    def verify_password(self, password) -> bool:
        return check_password_hash(self.password_hash, password)

    def get_id(self):
        return self.id

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password

    def set_password_hash(self, new_password):
        self.password = generate_password_hash(new_password)