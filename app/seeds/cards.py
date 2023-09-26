from app.models import db, environment, SCHEMA, Card
from sqlalchemy.sql import text

def seed_cards():
    card_1 = Card(
        title="Card 1",
        list_id=1,
        description="Description for Card 1",
        label_color="https://i.pinimg.com/564x/f4/c3/af/f4c3af4a43d10b43b7f74ac362fd4454.jpg",
    )

    card_2 = Card(
        title="Card 2",
        list_id=1,
        description="Description for Card 2",
        label_color="https://i.pinimg.com/474x/02/ff/1f/02ff1feafd330a5e3e7010554c8f0941.jpg",
    )

    card_3 = Card(
        title="Card 3",
        list_id=4,
        description="Description for Card 3",
        label_color="https://i.pinimg.com/474x/e8/3f/78/e83f78c128cebdea90951f2b041ebd92.jpg",
    )

    card_4 = Card(
        title="Card 4",
        list_id=2,
        description="Description for Card 4",
        label_color="https://i.pinimg.com/474x/57/4e/4b/574e4bae17651afa9c3da1d893a14df6.jpg",
    )

    card_5 = Card(
        title="Card 5",
        list_id=2,
        description="Description for Card 5",
        label_color="https://i.pinimg.com/474x/74/3b/ee/743beebe4e86dae054e27ffbaa845626.jpg",
    )

    card_6 = Card(
        title="Card 6",
        list_id=3,
        description="Description for Card 6",
        label_color="https://i.pinimg.com/474x/57/4e/4b/574e4bae17651afa9c3da1d893a14df6.jpg",
    )

    card_7 = Card(
        title="Card 7",
        list_id=3,
        description="Description for Card 7",
        label_color="https://i.pinimg.com/474x/c9/a2/42/c9a242873112aa884b1fa7b944a56ba3.jpg",
    )

    card_8 = Card(
        title="Card 8",
        list_id=4,
        description="Description for Card 8",
        label_color="https://i.pinimg.com/474x/02/ff/1f/02ff1feafd330a5e3e7010554c8f0941.jpg",
    )

    card_9 = Card(
        title="Card 9",
        list_id=5,
        description="Description for Card 9",
        label_color="https://i.pinimg.com/474x/e8/3f/78/e83f78c128cebdea90951f2b041ebd92.jpg",
    )

    card_10 = Card(
        title="Card 10",
        list_id=5,
        description="Description for Card 10",
        label_color="https://i.pinimg.com/474x/c9/a2/42/c9a242873112aa884b1fa7b944a56ba3.jpg",
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
