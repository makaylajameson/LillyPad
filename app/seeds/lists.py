from app.models import db, environment, SCHEMA, List
from sqlalchemy.sql import text


def seed_lists():
    list_1 = List(title="Back Log", board_id=1)
    list_2 = List(title="Complete", board_id=1)
    list_3 = List(title="In Progress", board_id=1)
    list_4 = List(title="Ready For Review", board_id=1)
    list_5 = List(title="Ready to Style", board_id=1)
    list_6 = List(title="Work Out", board_id=2)
    list_7 = List(title="Complete Laundry", board_id=2)
    list_8 = List(title="Finish Capstone", board_id=2)
    list_9 = List(title="Grocery Shopping", board_id=2)
    list_10 = List(title="Start Project for ATDesigns", board_id=2)
    db.session.add(list_1)
    db.session.add(list_2)
    db.session.add(list_3)
    db.session.add(list_4)
    db.session.add(list_5)
    db.session.add(list_6)
    db.session.add(list_7)
    db.session.add(list_8)
    db.session.add(list_9)
    db.session.add(list_10)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
