from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)

    # Foreign Keys
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    card = db.relationship("Card", back_populates="comments")
    author = db.relationship("User", back_populates="comments_created")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "card_title": self.card.title,
            "author": self.author.to_dict(),
        }
