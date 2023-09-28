from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PickleType
import uuid

db = SQLAlchemy()


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cinemas = db.relationship('Cinema', backref='city')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Cinema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable='False')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city_id': self.city_id
        }


class Hall(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    rows = db.Column(db.Integer, nullable=False)
    columns = db.Column(db.Integer, nullable=False)
    cinema_id = db.Column(db.Integer, db.ForeignKey('cinema.id'), nullable=False)
    cinema = db.relationship('Cinema', backref='halls')

    def __init__(self, *args, **kwargs):
        super(Hall, self).__init__(*args, **kwargs)
        self.create_seats()

    def create_seats(self):
        for seat in self.seats:
            db.session.delete(seat)

        for row in range (1, self.rows + 1):
            for column in range(1, self.columns + 1):
                seat = Seat(seat_row=row, seat_column=column, hall=self)
                db.session.add(seat)

        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rows': self.rows,
            'columns': self.columns,
            'cinema_id': self.cinema_id
        }


class Seat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seat_row = db.Column(db.Integer, nullable=False)
    seat_column = db.Column(db.Integer, nullable=False)
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.id'))
    hall = db.relationship('Hall', backref='seats')

    def to_dict(self):
        return {
            'id': self.id,
            'seat_row': self.seat_row,
            'seat_column': self.seat_column
        }


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
    title = db.Column(db.String, nullable=False)
    director = db.Column(db.String(300))
    actors = db.Column(db.String(300))
    release_date = db.Column(db.Date, nullable=False)
    runtime = db.Column(db.String)
    genre = db.Column(db.String, nullable=False)
    overview = db.Column(db.String(600), nullable=False)
    poster_path = db.Column(db.String(200), nullable=False)
    vote_count = db.Column(db.Integer)
    vote_average = db.Column(db.Float)
    adult = db.Column(db.Boolean, default=False)

    def to_dict(self):
        base_url_img = "https://image.tmdb.org/t/p/"
        poster_path_w185 = base_url_img + "w185" + self.poster_path
        poster_path_w342 = base_url_img + "w342" + self.poster_path
        poster_path_w500 = base_url_img + "w500" + self.poster_path

        return {
            'id': self.id,
            'tmdb_id': self.tmdb_id,
            'title': self.title,
            'director': self.director,
            'actors': self.actors,
            'release_date': self.release_date,
            'runtime': self.runtime,
            'genre': self.genre,
            'overview': self.overview,
            'poster_path_w185': poster_path_w185,
            'poster_path_w342': poster_path_w342,
            'poster_path_w500': poster_path_w500,
            'vote_count': self.vote_count,
            'vote_average': self.vote_average,
            'adult': self.adult
        }


class Showtime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.Date, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    movie = db.relationship('Movie', backref='showtimes')
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.id'), nullable=False)
    hall = db.relationship('Hall', backref='showtimes')

    def get_taken_seats(self):
        taken_seats = []
        for reservation_ticket in self.reservation_tickets:
            if reservation_ticket.is_confirmed:
                for seat_id in reservation_ticket.seat_ids:
                    seat = Seat.query.get(seat_id)
                    taken_seats.append(seat)
        return taken_seats

    def to_dict(self):
        movie_data = self.movie.to_dict()
        return {
            'id': self.id,
            'start_time': self.start_time.isoformat(),
            'cinema': self.hall.cinema.name,
            'hall_name': self.hall.name,
            'title': movie_data['title'],
            'director': movie_data['director'],
            'actors': movie_data['actors'],
            'genre': movie_data['genre'],
            'poster_path_w185': movie_data['poster_path_w185'],
            'movie_id': self.movie_id,
            'hall_id': self.hall_id,
            'cinema_id': self.hall.cinema.id,
            'city_id': self.hall.cinema.city.id
        }


class ReservationTicket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, default=str(uuid.uuid4()))
    client_name = db.Column(db.String(50), nullable=False)
    showtime_id = db.Column(db.Integer, db.ForeignKey('showtime.id'))
    showtime = db.relationship('Showtime', backref='reservation_tickets')
    seat_ids = db.Column(PickleType, nullable=False)
    is_confirmed = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'uuid': self.uuid,
            'client_name': self.client_name,
            'showtime_id': self.showtime_id,
            'seat_ids': self.seat_ids,
            'is_confirmed': self.is_confirmed
        }
