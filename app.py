import os
import json
from flask import Flask, render_template, abort, request
from models import db, City, Cinema, Showtime, ReservationTicket, Seat
from seed import init_db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cinema.db'
db.init_app(app)

with app.app_context():
    db.create_all()
    init_db()


@app.route('/')
def home():
    cities = City.query.all()
    return render_template('home.html', cities=cities)


@app.route('/city/<int:city_id>/cinemas')
def cinemas(city_id):
    city = City.query.get(city_id)
    if city is None:
        abort(404, "Podane miasto nie istnieje")
    cinemas = city.cinemas
    return render_template('cinemas.html', city=city, cinemas=cinemas)


@app.route('/city/<int:city_id>/cinemas/<int:cinema_id>')
def cinema(city_id, cinema_id):
    city = City.query.get(city_id)
    cinema = Cinema.query.get(cinema_id)
    if city is None or cinema is None:
        abort(404, "Podane miasto lub kino nie istnieje")
    return render_template('cinema.html', cinema=cinema)


@app.route('/city/<int:city_id>/cinemas/<int:cinema_id>/showtimes')
def showtimes(city_id, cinema_id):
    cinema = Cinema.query.get(cinema_id)
    if cinema is None:
        abort(404, "Podane kino nie istnieje")
    return render_template('showtimes.html', cinema=cinema)


@app.route('/select_seat/<int:showtime_id>/select_seat', methods=['GET', 'POST'])
def select_seat(showtime_id):
    showtime = Showtime.query.get(showtime_id)

    taken_seat = showtime.get_taken_seat()
    taken_seat_dictionary = [{'id': seat.id, 'row': seat.seat_row, 'column': seat.seat_column} for seat in taken_seat]
    taken_seat_json = json.dumps(taken_seat_dictionary)

    all_seats = showtime.hall.seats
    all_seats_dictionary = [{'id': seat.id, 'row': seat.seat_row, 'column': seat.seat_column} for seat in all_seats]
    all_seats_json = json.dumps(all_seats_dictionary)

    return render_template('select_seats.html', showtime=showtime, taken_seat_json=taken_seat_json, all_seats_json=all_seats_json)


@app.route('/ticket_reservation/<int:showtime_id>', methods=['POST'])
def ticket_reservation(showtime_id):
    seat_ids = request.form.get('seat_ids').split(',')
    seat_ids = [int(seat_id) for seat_id in seat_ids]
    showtime = Showtime.query.get(showtime_id)

    for seat_id in seat_ids:
        seat = Seat.query.get(seat_id)
        if seat in showtime.get_taken_seat():
            return "Miejsce jest już zarezerwowane.", 400
    return render_template('ticket_reservation.html', showtime_id=showtime_id, seat_ids=','.join(map(str, seat_ids)))


@app.route('/ticket_reservation/<int:showtime_id>/confirm_reservation', methods=['POST'])
def confirm_reservation(showtime_id):
    showtime = Showtime.query.get(showtime_id)
    client_name = request.form.get('client_name')
    seat_ids = request.form.get('seat_ids').split(',')
    seats_info = []

    for seat_id in seat_ids:
        seat_id = int(seat_id)
        reservation = ReservationTicket(client_name=client_name, showtime_id=showtime_id, seat_id=seat_id)
        db.session.add(reservation)

        seat = Seat.query.get(seat_id)
        seats_info.append(seat)

    db.session.commit()

    number_tickets = len(seat_ids)

    return render_template('confirm_reservation.html', client_name=client_name, showtime=showtime, seats_info=seats_info, number_tickets=number_tickets)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
