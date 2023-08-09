from .db import db, environment, SCHEMA, add_prefix_for_prod


class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    label_color = db.Column(db.String(255))

    # Foreign Keys
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False)

    # Relationships
    list = db.relationship("List", back_populates="cards")
    comments = db.relationship("Comment", back_populates="card", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "label_color": self.label_color,
            "list_title": self.list.title,
            "comments": [comment.to_dict() for comment in self.comments],
            "number_of_comments": len(self.comments)
        }
