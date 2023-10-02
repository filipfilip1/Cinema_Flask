# Cinema_Flask

## Description
Cinema_Flask is a web application designed for browsing movie showtimes and reserving seats for selected screenings in a specific cinema. Showtimes are created based on data fetched weekly from TMDB API using Heroku Scheduler. The application is built using React for the frontend and Flask for the backend and is deployed on the Heroku platform. Currently, the application is optimized for desktop devices.

[Live Version](https://cinemareservation-1a5118dab777.herokuapp.com/)

### Features:
- **Browse Listings:** View the current cinema listings.
- **Detailed Movie Descriptions:** Each movie has a detailed description, including director, actors, genre, runtime, and average ratings from TMDB.
- **Screening Filters:** Use the interactive calendar to filter and display screenings for a particular day.
- **Selecting a Screening:** After selecting a specific screening, users can see a cinema hall view with available and occupied seats.
- **Confirmation of Order:** Before confirming a reservation, users can check reservation details.
- **Reservation Details:** After confirming a reservation, users are redirected to the final page where they can download their ticket in PDF format.
- **Repertoire Update:** Every week, the application automatically updates available movies and showtimes by fetching a list of popular movies from the TMDB API.

### Repository Structure:
The project is divided into two main branches:
- **main:** This branch is used for deploying the application on Heroku. It contains a stable version of the code that is production-ready.
- **development:** This is the development branch where initial data is initialized by the seed.py script. In this branch, sqlite is used as the database.

### Technologies Used:
#### Frontend:
- **React:** For building the user interface.
- **Axios:** Handling HTTP requests.
- **Bootstrap, React-Bootstrap, Styled-components:** For styling React components.
- **PDFMake:** Generates PDF tickets based on the TicketReservation model.
- **QRCode:** Produces a QR code for the ticket based on its UUID.
- **React Calendar:** An interactive calendar for filtering screenings based on the selected date.
- **React Router DOM:** Implements Single Page Application with browser-side routing.

#### Backend:
- **Flask:** A framework responsible for the application's server.
- **SQLAlchemy:** ORM for interacting with the database in Python.
- **psycopg2:** PostgreSQL database adapter for Python.
- **python-decouple:** Retrieving environment variables.
- **requests:** Server-side HTTP requests.
- **Heroku**: The application is hosted on Heroku.
- **Heroku Scheduler:** Used for automatic weekly updates of the movie repertoire.

### License:
The TMDB API key provided in the development branch is for testing and demonstration purposes only.
## Screenshots
![Home Page](https://i.imgur.com/73COvqG.jpg)
![Calendar](https://i.imgur.com/ZASPPmJ.jpg)
![Select Showtime](https://i.imgur.com/qrHnR4D.jpg)
![Select Seats](https://i.imgur.com/JbJZmvI.jpg)
![Confirm Reservation](https://i.imgur.com/ZTVVYXF.jpg)
![Reservation Details](https://i.imgur.com/EXBgemJ.jpg)
![PDF Ticket](https://i.imgur.com/oU1Z0V8.jpg)


