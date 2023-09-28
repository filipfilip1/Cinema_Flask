from flask import Flask, abort, request, jsonify
from models import db, City, Cinema, Showtime, ReservationTicket, Movie
from decouple import config
from datetime import datetime
import uuid


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = config('DATABASE_URL')
    db.init_app(app)

    return app




@app.route('/api/cities', methods=['GET'])
def get_cities():
    cities = City.query.all()
    return jsonify([city.to_dict() for city in cities])


@app.route('/api/city/<int:city_id>/cinemas', methods=['GET'])
def get_cinemas(city_id):
    city = City.query.get(city_id)
    if city is None:
        abort(404, "Podane miasto nie istnieje")
    cinemas = city.cinemas
    return jsonify([cinema.to_dict() for cinema in cinemas])


@app.route('/api/cinema/<int:cinema_id>', methods=['GET'])
def get_cinema(cinema_id):
    cinema = Cinema.query.get(cinema_id)
    if cinema is None:
        abort(404, "Podane kino nie istnieje")
    return jsonify(cinema.to_dict())


@app.route('/api/cinema/<int:cinema_id>/showtimes', methods=['GET'])
def get_showtimes(cinema_id):
    cinema = Cinema.query.get(cinema_id)
    if cinema is None:
        abort(404, "Podane kino nie istnieje")
    all_showtimes = []
    for hall in cinema.halls:
        all_showtimes.extend(hall.showtimes)

    return jsonify([showtime.to_dict() for showtime in all_showtimes])


@app.route('/api/showtimes/<int:showtime_id>', methods=['GET'])
def get_showtime(showtime_id):
    showtime = Showtime.query.get(showtime_id)
    if showtime is None:
        abort(404, "Złe Id dla seansu")
    return jsonify(showtime.to_dict())


@app.route('/api/movie/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if movie is None:
        abort(404, "Podany film nie istnieje")
    return jsonify(movie.to_dict())


@app.route('/api/select_seats/<int:showtime_id>', methods=['GET'])
def get_seats(showtime_id):
    showtime = Showtime.query.get(showtime_id)
    if showtime is None:
        return abort(404, "Złe Id dla seansu")

    taken_seats = [seat.to_dict() for seat in showtime.get_taken_seats()]
    all_seats = [seat.to_dict() for seat in showtime.hall.seats]

    return jsonify({
        "taken_seats": taken_seats,
        "all_seats": all_seats
    })


@app.route('/api/ticket_reservation/<int:showtime_id>/confirm_reservation', methods=['POST'])
def confirm_reservation(showtime_id):
    client_name = request.json.get("client_name")
    seat_ids = request.json.get("seat_ids")

    reservation_uuid = str(uuid.uuid4())
    reservation = ReservationTicket(client_name=client_name, showtime_id=showtime_id, seat_ids=seat_ids, uuid=reservation_uuid)
    db.session.add(reservation)
    db.session.commit()

    return jsonify({"ticket_reservation_id": reservation.id})


@app.route('/api/reservation_details/<int:reservation_ticket_id>', methods=['GET'])
def get_reservation_details(reservation_ticket_id):
    reservation = ReservationTicket.query.filter_by(id=reservation_ticket_id).first()
    if not reservation:
        return jsonify({"error": "Rezerwacja nie została znaleziona"}), 404


@app.route('/api/repertuar', methods=['GET'])
def get_repertuar():
    today = datetime.now().date()
    now_playing_showtimes = Showtime.query.filter(Showtime.date >= today).all()

    unique_movies = set()

    for showtime in now_playing_showtimes:
        unique_movies.add(showtime.movie)

    movies_list = [movie.to_dict() for movie in unique_movies]

    return jsonify(movies_list)

