from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    demo_board_one = Board(
        title="My Capstone Project",
        background_image="https://i.pinimg.com/564x/ef/e0/45/efe0453dd09bccf101c781acd42310a8.jpg",
        owner_id=1,
    )

    demo_board_two = Board(
        title="Daily Schedule",
        background_image="https://i.pinimg.com/564x/e8/43/bc/e843bc35162a8029c26e44d18f15fcf4.jpg",
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
