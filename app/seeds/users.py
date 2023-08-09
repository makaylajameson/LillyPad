from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        username='Demo',
        email='demo@aa.io',
        password='password',
        profile_pic='https://headshots-inc.com/wp-content/uploads/2023/02/Acting-Headshot-Photography-Example-1.jpg')
    makayla = User(
        first_name='Makayla',
        last_name='Jameson',
        username='makayla',
        email='makayla@aa.io',
        password='password',
        profile_pic='https://images.squarespace-cdn.com/content/v1/50204bd5e4b03f6f4d185490/1651867901477-5INOIVR9GFERVY7VF4PX/Retouched+Headshot+Sample+1.jpg')
    marnie = User(
        first_name='Marnie',
        last_name='Joe',
        username='marnie',
        email='marnie@aa.io',
        password='password',
        profile_pic='https://www.epicscotland.com/wp-content/uploads/2019/09/Business-Headshot-Women-004.jpg')
    bobbie = User(
        first_name='Bobbie',
        last_name='Brown',
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        profile_pic='https://vanitystudios.co.uk/wp-content/uploads/2020/10/8I8A0034-scaled.jpg')

    db.session.add(demo)
    db.session.add(makayla)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
