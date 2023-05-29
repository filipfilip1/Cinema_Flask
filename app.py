from flask import Flask, render_template, abort
from models import db, City, Cinema


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cinema.db'
db.init_app(app)

with app.app_context():
    db.create_all()

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


@app.route('/showtimes/<int:cinema_id>')
def showtimes(cinema_id):
    return None


if __name__ == '__main__':
    app.run()
