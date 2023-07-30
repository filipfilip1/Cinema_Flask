import datetime
from app import db
from models import Showtime, Hall, Movie, Cinema, City, Seat

def init_db():
    db.drop_all()
    db.create_all()

    cities = [City(name='Gdańsk'), City(name='Gdynia'), City(name='Sopot')]
    db.session.add_all(cities)
    db.session.commit()

    cinemas = [Cinema(name='Helios', city=cities[0]),
               Cinema(name='Helios', city=cities[1]),
               Cinema(name='Helios', city=cities[2])]

    db.session.add_all(cinemas)
    db.session.commit()

    halls = [Hall(number=1, cinema=cinemas[0]),
             Hall(number=2, cinema=cinemas[0]),
             Hall(number=1, cinema=cinemas[1]),
             Hall(number=2, cinema=cinemas[1]),
             Hall(number=1, cinema=cinemas[2]),
             Hall(number=2, cinema=cinemas[2])]

    db.session.add_all(halls)
    db.session.commit()

    for hall in halls:
        for row in range(1, 6):
            for column in range(1, 11):
                seat = Seat(seat_row=row, seat_column=column, hall=hall)
                db.session.add(seat)
    db.session.commit()

    movies = [Movie(title='Oppenheimer', director='Christopher Nolan', production_year=2023, duration=180, genre='biography'),
              Movie(title='Barbie', director='Greta Gerwig', production_year=2023, duration=114, genre='comedy')]

    db.session.add_all(movies)
    db.session.commit()

    showtimes = [Showtime(movie=movies[0], hall=halls[0], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(15, 0))),
                 Showtime(movie=movies[0], hall=halls[1], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(18, 0))),
                 Showtime(movie=movies[1], hall=halls[2], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(15, 0))),
                 Showtime(movie=movies[1], hall=halls[3], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(18, 0))),
                 Showtime(movie=movies[0], hall=halls[4], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(15, 0))),
                 Showtime(movie=movies[1], hall=halls[5], start_time=datetime.datetime.combine(datetime.date.today(), datetime.time(18, 0)))]

    db.session.add_all(showtimes)
    db.session.commit()
