from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helper import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
import re

def is_valid_email(form, field):
    # Checking if email is valid
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(email_pattern, email):
        raise ValidationError('Invalid email address.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired(), username_exists])
    profile_pic = FileField('Profile Picture', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    email = StringField('Email', validators=[DataRequired(), user_exists, is_valid_email])
    password = StringField('Password', validators=[DataRequired(), Length(min=6)])
