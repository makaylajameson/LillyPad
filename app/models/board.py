from .db import db, environment, SCHEMA, add_prefix_for_prod


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    background_image = db.Column(db.String(255), nullable=False)

    # Foreign Keys
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    owner = db.relationship("User", back_populates="board")
    lists = db.relationship("List", back_populates="board", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "background_image": self.background_image,
            "owner": self.owner.to_dict(),
            "lists": [list.to_dict() for list in self.lists]
        }
