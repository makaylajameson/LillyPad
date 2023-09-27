from app.models import db, environment, SCHEMA, Card
from sqlalchemy.sql import text

def seed_cards():
    card_1 = Card(
        title="CRUD for Lists",
        list_id=1,
        description="Need to be able to create, read, update, and delete lists",
        label_color="#4287f5",
    )
    card_2 = Card(
        title="CRUD for Comments",
        list_id=1,
        description="Need to be able to create, read, update, and delete comments",
        label_color="#f5f542",
    )
    card_3 = Card(
        title="Auth Me",
        list_id=2,
        description="Complete Auth me for users",
        label_color="#4287f5",
    )
    card_4 = Card(
        title="CRUD for Cards",
        list_id=2,
        description="Need to be able to create, read, update, and delete cards",
        label_color="#42f54b",
    )
    card_5 = Card(
        title="CSS for Cards",
        list_id=3,
        description="Do the CSS for the cards",
        label_color="#cb42f5",
    )
    card_6 = Card(
        title="ASW for Profile Image",
        list_id=3,
        description="Implement AWS for profile image",
        label_color="#4245f5",
    )
    card_7 = Card(
        title="Card 7",
        list_id=4,
        description="Description for Card 7",
        label_color="#4245f5",
    )
    card_8 = Card(
        title="Card 8",
        list_id=4,
        description="Description for Card 8",
        label_color="#cb42f5",
    )
    card_9 = Card(
        title="Card 9",
        list_id=5,
        description="Description for Card 9",
        label_color="#42f54b",
    )
    card_10 = Card(
        title="Card 10",
        list_id=5,
        description="Description for Card 10",
        label_color="#f54242",
    )
    card_11 = Card(
        title="Card 11",
        list_id=6,
        description="Description for Card 9",
        label_color="#f5f542",
    )
    card_12 = Card(
        title="Card 12",
        list_id=6,
        description="Description for Card 10",
        label_color="#42f54b",
    )
    card_13 = Card(
        title="Card 13",
        list_id=7,
        description="Description for Card 9",
        label_color="#cb42f5",
    )
    card_14 = Card(
        title="Card 14",
        list_id=7,
        description="Description for Card 10",
        label_color="#42f54b",
    )
    card_15 = Card(
        title="Card 15",
        list_id=8,
        description="Description for Card 9",
        label_color="#f54242",
    )
    card_16 = Card(
        title="Card 16",
        list_id=8,
        description="Description for Card 10",
        label_color="#4287f5",
    )
    card_17 = Card(
        title="Card 17",
        list_id=9,
        description="Description for Card 9",
        label_color="#4245f5",
    )
    card_18 = Card(
        title="Card 18",
        list_id=9,
        description="Description for Card 10",
        label_color="#f5f542",
    )
    card_19 = Card(
        title="Card 19",
        list_id=10,
        description="Description for Card 9",
        label_color="#cb42f5",
    )
    card_20 = Card(
        title="Card 20",
        list_id=10,
        description="Description for Card 10",
        label_color="#f54242",
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
    db.session.add(card_11)
    db.session.add(card_12)
    db.session.add(card_13)
    db.session.add(card_14)
    db.session.add(card_15)
    db.session.add(card_16)
    db.session.add(card_17)
    db.session.add(card_18)
    db.session.add(card_19)
    db.session.add(card_20)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
