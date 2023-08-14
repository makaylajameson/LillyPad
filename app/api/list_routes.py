from flask import Blueprint, request
from flask_login import login_required
from app.models import List, db
from app.forms import ListForm

list_routes = Blueprint("lists", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Single List by ID
@list_routes.route("/<int:id>")
@login_required
def get_single_list(id):

    list = List.query.get(id)

    if list is None:
        return {"errors": "This List could not be found"}, 404

    single_list = list.to_dict()
    return {"single_list": single_list}

# Create a new List
@list_routes.route("/new-list", methods=["POST"])
@login_required
def create_list():

    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_list = List(
            title=data["title"],
            board_id=data["board_id"]
        )

        db.session.add(new_list)
        db.session.commit()

        return {"list": new_list.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit a single List
@list_routes.route("/<int:id>", methods=["PUT"])
def list_to_update(id):

    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        list_to_update = List.query.get(id)

        if data["title"]:
            list_to_update.title = data["title"]

        db.session.commit()
        return {"list": list_to_update.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete a single List
@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):

    list = List.query.get(id)

    if list is None:
        return {"errors": "This List could not be found"}, 404

    db.session.delete(list)
    db.session.commit()
    return {"message": "Successfully Deleted"}, 200
