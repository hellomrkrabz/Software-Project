import os
basedir = os.path.abspath(os.path.dirname(__file__))

DATABASE_URL = "postgresql://rwybqwpr:n0S3V5DoHv3s4MK3n2IZIaYU43LS7mCU@mouse.db.elephantsql.com/rwybqwpr"

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret'

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
