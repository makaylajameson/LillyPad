from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

def validate_title(form, field):
    title = field.data
    if not (2 <= len(title) <= 100):
        raise ValidationError('Title must be between 2 and 100 characters.')

class EditBoardForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), validate_title])
    background_image = StringField("Background Image", validators=[DataRequired()])
