from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cinemas = db.relationship('Cinema', backref='city')


class Cinema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'), nullable='False')
    halls = db.relationship('Hall', backref='cinema')


class Hall(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    cinema_id = db.Column(db.Integer, db.ForeignKey('cinema.id'), nullable=False)
    showtimes = db.relationship('Showtime', backref='hall')


class Seat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seat_row = db.Column(db.Integer, nullable=False)
    seat_column = db.Column(db.Integer, nullable=False)
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.id'))
    hall = db.relationship('Hall', backref='seats')

    def get_seat_info(self):
        return {'seat_row': self.seat_row, 'seat_column': self.seat_column}


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    director = db.Column(db.String, nullable=False)
    production_year = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String, nullable=False)
    description = db.Column(db.String(600))


class Showtime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    movie = db.relationship('Movie', backref='showtimes')
    hall_id = db.Column(db.Integer, db.ForeignKey('hall.id'), nullable=False)

    reservation_tickets = db.relationship('ReservationTicket', backref='showtime')

    def get_taken_seat(self):
        taken_seat = []
        for reservation_ticket in self.reservation_tickets:
            if reservation_ticket.is_confirmed:
                taken_seat.append(reservation_ticket.seat)
        return taken_seat


class ReservationTicket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(50), nullable=False)
    showtime_id = db.Column(db.Integer, db.ForeignKey('showtime.id'))
    seat_id = db.Column(db.Integer, db.ForeignKey('seat.id'))
    seat = db.relationship('Seat', backref='reservation_ticket')
    price = db.Column(db.Float)
    is_confirmed = db.Column(db.Boolean, default=True)
