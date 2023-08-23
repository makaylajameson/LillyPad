from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class CardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    list_id = IntegerField("List Id", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    label_color = StringField("Label Color")
