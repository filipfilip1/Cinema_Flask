from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class Cinema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable='False')
    city = db.relationship('City', backref="cinemas")


class Hall(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    cinema_id = db.Column(db.Integer, db.ForeignKey('cinema.id'), nullable=False)
    cinema = db.relationship('Cinema', backref='halls')


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    director = db.Column(db.String, nullable=False)
    production_year = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)


class Showtime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeginKey('movie.id'), nullable=False)
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.id'), nullable=False)
    start_time = db.Column(db.Integer, nullable=False)
    movie = db.relationship('Movie', backref='showtimes')
    hall = db.relationship('Hall', backref='showtimes')