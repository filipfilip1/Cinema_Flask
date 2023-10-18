import datetime
from app import create_app
from models import db, Showtime, Movie, Cinema
from tmdb_api import set_global_genres, fetch_popular_movie, save_movie_if_not_exist


def weekly_update_movies_from_tmdb():
    with create_app().app_context():
        set_global_genres()
        popular_movies = fetch_popular_movie()
        save_movie_if_not_exist(popular_movies)

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
                        db.session.add(showtime)

                        movie_index = (movie_index + 1) % len(movies_to_show)

        db.session.commit()


# add movies to database on Wednesday
if datetime.datetime.today().weekday() == 2:
    weekly_update_movies_from_tmdb()
