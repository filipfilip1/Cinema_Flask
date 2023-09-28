import datetime
from app import create_app, db
from models import db, Showtime, Hall, Movie, Cinema, City
from tmdb_api import set_global_genres, fetch_popular_movie, save_movie_if_not_exist

app = create_app()


def init_db(app_instance, db_instance):
    with app_instance.app_context():
        db_instance.drop_all()
        db_instance.create_all()

        set_global_genres()
        popular_movies = fetch_popular_movie()
        save_movie_if_not_exist(popular_movies)

        cities = ["Gdańsk", "Gdynia", "Sopot"]
        for city_name in cities:
            city_obj = City(name=city_name)
            db_instance.session.add(city_obj)

            for i in range(2):
                cinema = Cinema(name=f"Kino {city_name} {i+1}", city=city_obj)
                db_instance.session.add(cinema)

                for j in range(4):
                    hall = Hall(name=f"Sala {j+1}", rows=10, columns=10, cinema=cinema)
                    db_instance.session.add(hall)

        db_instance.session.commit()

        popular_movie_ids = [movie['id'] for movie in popular_movies]
        movies_to_show = Movie.query.filter(Movie.tmdb_id.in_(popular_movie_ids)).all()

        showtime_hours = [8, 12, 16, 20]
        today = datetime.date.today()
        movie_index = 0

        for day in range(7):
            for cinema in Cinema.query.all():
                for hall in cinema.halls:
                    for hour in showtime_hours:
                        movie = movies_to_show[movie_index]
                        start_time = datetime.datetime.combine(today + datetime.timedelta(days=day),
                                                               datetime.time(hour=hour))
                        showtime = Showtime(start_time=start_time, date=start_time.date(), movie=movie, hall=hall)
                        db_instance.session.add(showtime)

                        movie_index = (movie_index + 1) % len(movies_to_show)

        db_instance.session.commit()


if __name__ == "__main__":
    with app.app_context():
        if not City.query.first():
            init_db(app, db)