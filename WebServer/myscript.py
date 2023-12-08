# import oracledb
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base

from sqlalchemy import Column, Integer, String

import cx_Oracle

# flask app
oracle_connection_string = (
    "oracle+cx_oracle://{username}:{password}@"
    + cx_Oracle.makedsn("{hostname}", "{port}", service_name="{service_name}")
)

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = oracle_connection_string.format(
    username="test_user3",
    password="password1",
    hostname="localhost",
    port="1521",
    service_name="XEPDB1",
)

db = SQLAlchemy(app)

#
# Base = declarative_base()
# Base.query = db.session.query_property()


class Person(db.Model):
    __tablename__ = "Person"

    id = Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(db.String(255))
    phone_number = db.Column(db.String(255))
    img_src = db.Column(db.String(255))

    def __repr__(self):
        return f"name: {self.name}, number: {self.phone_number}"


#
# class Contact(db.Model):
#     __tablename__ = "Contact"
#
#     id = db.Column(
#         db.Integer,
#         primary_key=True,
#     )
#     name = db.Column(db.String(255))
#     phone_number = db.Column(db.String(255))
#     img_src = db.Column(db.String(255))
#
#     def __init__(self, name=None, phone_number=None, img_src=None):
#         self.name = name
#         self.phone_number = phone_number
#         self.img_src = img_src
#

default_images = [
    "../src/assets/spike.jpg",
    "../src/assets/jet.jpg",
    "../src/assets/faye.jpg",
    "../src/assets/edward.jpg",
]

with app.app_context():
    db.drop_all()
    db.create_all()
    # let's add the bebop crew
    spike = Person(
        id=1, name="Spike Spiegel", phone_number="123123123", img_src=default_images[0]
    )
    jet = Person(
        id=2, name="Jet Black", phone_number="456456456", img_src=default_images[1]
    )
    faye = Person(
        id=3, name="Faye Valentine", phone_number="789789789", img_src=default_images[2]
    )
    ed = Person(id=4, name="Ed", phone_number="4737872895", img_src=default_images[3])

    db.session.add_all([spike, jet, faye, ed])
    db.session.commit()


# init_db()

# fetch all rows to check if they are added or not

# bebop_crew = Contact.query.all()
#
# for b in bebop_crew:
#     print(f"ID: {b.id}, name: {b.name}, phone: {b.phone_number}")


# Vanilla DB connnection. It's a miracle it works

# dsn = f"{username}/{userpwd}@{host}:{port}/{service_name}"
# connection = oracledb.connect(dsn)


@app.route("/")
def index():
    return "Welcome to the server"


@app.route("/info")
def test():
    result = {"sember": "rember"}
    return jsonify(result)


@app.route("/bebop")
def get_bebop():
    bebop_crew = Person.query.all()

    result = [
        {"id": b.id, "name": b.name, "phone": b.phone_number, "img_src": b.img_src}
        for b in bebop_crew
    ]

    for b in bebop_crew:
        print(f"name: {b.name}")

    return jsonify(result)


@app.route("/bebop", methods=["POST"])
def add_bebop_member():
    data = request.get_json()

    new_member = Contact(
        name=data["name"],
        phone_number=data["phone"],
    )
    db.session.add(new_member)
    db.session.commit()


# cursor = connection.cursor()
# print(cursor)
# cursor.execute("SELECT user FROM dual")
#
# for result in cursor:
#     print("Connected as user:", result[0])
#
# cursor.close()
# connection.close()

if __name__ == "__main__":
    app.run(port=5000, debug=True, threaded=False)
