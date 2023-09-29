from decouple import config
from app import create_app
from seed import init_db

app = create_app()

RUN_SEED = config('RUN_SEED') == "True"

if RUN_SEED:
    init_db()
