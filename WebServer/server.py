from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

import cx_Oracle

oracle_connection_string = (
    "oracle+cx_oracle://{username}:{password}@"
    + cx_Oracle.makedsn("{hostname}", "{port}", service_name="{service_name}")
)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = oracle_connection_string.format(
    username="test_user3",
    password="password1",
    hostname="localhost",
    port="1521",
    service_name="XEPDB1",
)

db = SQLAlchemy(app)

person_id_seq = db.Sequence("PERSON_ID_SEQ")
user_id_seq = db.Sequence("USER_ID_SEQ")


class User(db.Model):
    __tablename__ = "USER"

    id = db.Column(
        db.Integer,
        user_id_seq,
        server_default=user_id_seq.next_value(),
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    contacts = db.relationship("Person", backref="user", lazy=True)

    def __repr__(self):
        return f"user: {self.name}, pass: {self.password}"


class Person(db.Model):
    __tablename__ = "PERSON"

    ID = db.Column(
        db.Integer,
        person_id_seq,
        server_default=person_id_seq.next_value(),
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(db.String(255))
    phone_number = db.Column(db.String(255))
    imgSrc = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("USER.id"), nullable=False)

    def __repr__(self):
        return (
            f"name: {self.name}, number: {self.phone_number}, in user: {self.user_id}"
        )


with app.app_context():
    db.create_all()

    default_user = User.query.filter_by(name="admin").first()

    if not default_user:
        # first create a  user
        default_user = User(name="admin", password="Password1.")
        db.session.add(default_user)
        db.session.commit()

    # let's add the bebop crew to default user

    spike = Person(
        name="Spike Spiegel", phone_number="123123123", user_id=default_user.id
    )

    jet = Person(name="Jet Black", phone_number="456456456", user_id=default_user.id)
    faye = Person(
        name="Faye Valentine", phone_number="789789789", user_id=default_user.id
    )
    ed = Person(name="Ed", phone_number="4737872895", user_id=default_user.id)

    db.session.add_all([spike, jet, faye, ed])
    db.session.commit()


def add_default_crew(user_id):
    spike = Person(name="Spike Spiegel", phone_number="123123123", user_id=user_id)
    jet = Person(name="Jet Black", phone_number="456456456", user_id=user_id)
    faye = Person(name="Faye Valentine", phone_number="789789789", user_id=user_id)
    ed = Person(name="Ed", phone_number="4737872895", user_id=user_id)

    db.session.add_all([spike, jet, faye, ed])
    db.session.commit()


@app.route("/")
def index():
    bebop_crew = Person.query.all()

    result = [
        {"id": b.ID, "name": b.name, "phone": b.phone_number, "user_id": b.user_id}
        for b in bebop_crew
    ]
    return jsonify(result)

    # return "<h1>Welcome to the Cowboy Bebop Contact Server! </h1>"


@app.route("/info")
def test():
    result = {"sember": "rember"}
    return jsonify(result)


@app.route("/user", methods=["POST", "GET"])
def users():
    if request.method == "POST":
        data = request.get_json()

        new_user = User(name=data["username"], password=data["password"])
        print(new_user)
        db.session.add(new_user)
        db.session.commit()

        # add cowboy bebop crew as default
        add_default_crew(new_user.id)

        # pass the id to guide the user into their dashboard
        return jsonify(new_user.id)
    elif request.method == "GET":
        username = request.args.get("username")
        password = request.args.get("password")

        if username and password:
            user = User.query.filter_by(name=username, password=password).first()

            if user:
                result = {
                    "username": user.name,
                    "password": user.password,
                    "id": user.id,
                }
                return jsonify(result)
            else:
                return jsonify({"message": "user not found"}), 404
        else:
            users = User.query.all()
            result = [
                {"username": user.name, "password": user.password, "id": user.id}
                for user in users
            ]

            return jsonify(result)


@app.route("/user/<int:user_id>/bebop")
def get_bebop_member(user_id):
    bebop_crew = Person.query.filter_by(user_id=user_id).all()

    result = [
        {"id": b.ID, "name": b.name, "phone": b.phone_number, "user_id": b.user_id}
        for b in bebop_crew
    ]

    for b in bebop_crew:
        print(f"name: {b.name}")

    return jsonify(result)


@app.route("/user/<int:user_id>/bebop", methods=["POST"])
def add_bebop_member(user_id):
    data = request.get_json()

    new_member = Person(
        name=data["name"],
        phone_number=data["phone"],
        user_id=user_id,
    )
    db.session.add(new_member)
    db.session.commit()
    return "added new member"


@app.route("/user/<int:user_id>/bebop", methods=["DELETE"])
def delete_bebop_member(user_id):
    id_to_delete = request.get_json()

    # print(f"request json: {id_to_delete}")
    Person.query.filter_by(ID=id_to_delete, user_id=user_id).delete()
    db.session.commit()

    return "Deleted " + str(id_to_delete)


@app.route("/user/<int:user_id>/bebop", methods=["PATCH"])
def update_bebop_member(user_id):
    data = request.get_json()

    person_id = data["id"]
    new_name = data["name"]
    new_phone_number = data["phone"]

    person = Person.query.filter_by(ID=person_id, user_id=user_id).first()
    person.name = new_name
    person.phone_number = new_phone_number

    db.session.commit()

    return "Updated " + str(person_id)


if __name__ == "__main__":
    app.run(port=5000, debug=True, threaded=False)
