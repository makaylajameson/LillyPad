from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    demo_board_one = Board(
        title="My Capstone Project",
        background_image="7bc3bce1aa06446f4ca419cdb9cc273b.jpg",
        owner_id=1,
    )

    demo_board_two = Board(
        title="Daily Schedule",
        background_image="40dd283fafd3c79cb9c01b430443859f.jpg",
        owner_id=1,
    )

    db.session.add(demo_board_one)
    db.session.add(demo_board_two)
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
