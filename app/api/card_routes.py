from flask import Blueprint, request
from flask_login import login_required
from app.models import Card, db
from app.forms import CardForm

card_routes = Blueprint("cards", __name__);

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Single Card by ID
@card_routes.route("/<int:id>")
@login_required
def get_single_card(id):

    card = Card.query.get(id)

    if card is None:
        return {"errors": "This Card could not be found"}, 404

    single_card = card.to_dict()
    return {"single_card": single_card}

# create a new Card
@card_routes.route("/new-card", methods=["POST"])
@login_required
def create_card():

    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_card = Card(
            list_id=data["list_id"],
            title=data["title"],
            description=data["description"],
            label_color=data["label_color"]
        )

        db.session.add(new_card)
        db.session.commit()

        return {"card": new_card.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit a single Card
@card_routes.route("/<int:id>/edit", methods=["PUT"])
def card_to_update(id):

    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        card_to_update = Card.query.get(id)

        if data["title"]:
            card_to_update.title = data["title"]

        if data["description"]:
            card_to_update.description = data["description"]

        if data["list_id"]:
            card_to_update.list_id = data["list_id"]

        if data["label_color"]:
            card_to_update.label_color = data["label_color"]

        db.session.commit()
        return {"card": card_to_update.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete a single List
@card_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_card(id):

    card = Card.query.get(id)

    if card is None:
        return {"errors": "This Card could not be found"}, 404

    db.session.delete(card)
    db.session.commit()
    return {"message": "Successfully Deleted"}, 200
