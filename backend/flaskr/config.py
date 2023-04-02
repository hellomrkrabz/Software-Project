import os
basedir = os.path.abspath(os.path.dirname(__file__))

DATABASE_URL = "postgresql://sp_project_user:i8wHkmkDzID5HGhfFEfpZIurZX7f6M32@dpg-cgkqb6ceoogkndknfuvg-a.frankfurt-postgres.render.com/sp_project"

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_RECORD_QUERIES = True

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = DATABASE_URL


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = DATABASE_URL

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
