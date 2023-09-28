import requests
from models import db, Movie
from decouple import config
from datetime import datetime

TMDB_API_KEY = config('API_KEY_TMDB')
TMDB_POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular'
TMDB_CREDITS_URL = 'https://api.themoviedb.org/3/movie/{}/credits'
TMDB_MOVIE_DETAILS_URL = 'https://api.themoviedb.org/3/movie/{}'
TMDB_GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list'
MOVIE_LIMIT = 8
ACTORS_LIMIT = 4
GENRES = None


def fetch_popular_movie():
    params = {
        'api_key': TMDB_API_KEY,
        'language': 'pl',
        'page': 1
    }

    response = requests.get(TMDB_POPULAR_URL, params=params)
    movies = response.json().get('results', [])

    return movies[:MOVIE_LIMIT]


def _fetch_movie_details(movie_id):
    params = {
        'api_key': TMDB_API_KEY,
        'language': 'pl'
    }

    response = requests.get(TMDB_MOVIE_DETAILS_URL.format(movie_id), params=params)
    return response.json()


def _fetch_movie_director_and_actors(movie_id):
    params = {
        'api_key': TMDB_API_KEY
    }

    response = requests.get(TMDB_CREDITS_URL.format(movie_id), params=params)
    credits = response.json()

    directors = [crew_member['name'] for crew_member in credits.get('crew', []) if crew_member['job'] == 'Director']
    actors = [actor['name'] for actor in credits.get('cast', [])[:ACTORS_LIMIT]]

    return ', '.join(directors), ', '.join(actors)


def _fetch_genres():
    params = {
        'api_key': TMDB_API_KEY,
        'language': 'pl'
    }

    response = requests.get(TMDB_GENRES_URL, params=params)
    return {genre['id']: genre['name'] for genre in response.json().get('genres', [])}


def set_global_genres(period_refresh=False):
    global GENRES
    if GENRES is None or period_refresh:
        GENRES = _fetch_genres()


def _convert_genres_ids_to_names(genre_ids):
    return ', '.join([GENRES.get(genre_id) for genre_id in genre_ids])


def save_movie_if_not_exist(movies):
    for movie_data in movies:
        movie_id = movie_data['id']
        found_movie = Movie.query.filter_by(tmdb_id=movie_id).first()
        if not found_movie:
            movie_details = _fetch_movie_details(movie_id)
            director, actors = _fetch_movie_director_and_actors(movie_id)
            genres = _convert_genres_ids_to_names(movie_data['genre_ids'])
            runtime = movie_details.get('runtime', 0)

            # Convert date from string format to date object for compatibility with SQLite database
            release_date_str = movie_data['release_date']
            release_date_obj = datetime.strptime(release_date_str, '%Y-%m-%d').date()

            movie = Movie(
                tmdb_id=movie_data['id'],
                title=movie_data['title'],
                director=director,
                actors=actors,
                release_date=release_date_obj,
                runtime=runtime,
                genre=genres,
                overview=movie_data['overview'],
                poster_path=movie_data['poster_path'],
                vote_count=movie_data['vote_count'],
                vote_average=movie_data['vote_average'],
                adult=movie_data['adult']
            )

            db.session.add(movie)

    db.session.commit()
