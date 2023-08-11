from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Board, User, db
from app.forms import BoardForm, EditBoardForm

board_routes = Blueprint("boards", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all the board of logged in user
@board_routes.route("/current")
@login_required
def current_boards():

    id = current_user.id

    boards = Board.query.filter(Board.owner_id == id)
    allBoards = [board.to_dict() for board in boards]

    return {"boards": allBoards}

# Get single board by the ID
@board_routes.route("/<int:id>")
@login_required
def get_single_board(id):

    board = Board.query.get(id)

    if board is None:
        return {"errors": "This Board could not be found"}, 404

    single_board = board.to_dict()
    return {"single_board": single_board}

# create a new board
@board_routes.route("/current", methods=["POST"])
@login_required
def create_board():

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_board = Board(
            title=data["title"],
            background_image=data["background_image"],
            owner_id=current_user.id,
        )

        db.session.add(new_board)
        db.session.commit()
        return {"board": new_board.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}

# Edit an current users board
@board_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_board(id):

    form = EditBoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        board_to_update = Board.query.get(id)

        if data["title"]:
            board_to_update.title = data["title"]

        if data["background_image"]:
            board_to_update.background_image = data["background_image"]

        db.session.commit()
        return {"board": board_to_update.to_dict()}

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}

# delete single board by id
@board_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_board(id):

    board = Board.query.get(id)

    if board is None:
        return {"errors": "This Board could not be found"}, 404

    if board.owner_id != current_user.id:
        return {"errors": "Only the owner of this board can delete"}, 401

    db.session.delete(board)
    db.session.commit()
    return {"message": "Successfully Deleted"}
