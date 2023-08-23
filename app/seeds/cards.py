from app.models import db, environment, SCHEMA, Card
from sqlalchemy.sql import text

def seed_cards():
    card_1 = Card(
        title="Card 1",
        list_id=1,
        description="Description for Card 1",
        label_color="#E74C3C",
    )

    card_2 = Card(
        title="Card 2",
        list_id=1,
        description="Description for Card 2",
        label_color="#A1BDD914",
    )

    card_3 = Card(
        title="Card 3",
        list_id=2,
        description="Description for Card 3",
        label_color="#A1BDD914",
    )

    card_4 = Card(
        title="Card 4",
        list_id=3,
        description="Description for Card 4",
        label_color="#AF7AC5",
    )

    card_5 = Card(
        title="Card 5",
        list_id=4,
        description="Description for Card 5",
        label_color="#A1BDD914",
    )

    card_6 = Card(
        title="Card 6",
        list_id=5,
        description="Description for Card 6",
        label_color="#2874A6",
    )

    card_7 = Card(
        title="Card 7",
        list_id=5,
        description="Description for Card 7",
        label_color="#2874A6",
    )

    card_8 = Card(
        title="Card 8",
        list_id=5,
        description="Description for Card 8",
        label_color="#2874A6",
    )

    card_9 = Card(
        title="Card 9",
        list_id=5,
        description="Description for Card 9",
        label_color="#2874A6",
    )

    card_10 = Card(
        title="Card 10",
        list_id=5,
        description="Description for Card 10",
        label_color="#2874A6",
    )

    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.add(card_4)
    db.session.add(card_5)
    db.session.add(card_6)
    db.session.add(card_7)
    db.session.add(card_8)
    db.session.add(card_9)
    db.session.add(card_10)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
