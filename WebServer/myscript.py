# import oracledb
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import cx_Oracle
from sqlalchemy import Identity

# flask app
oracle_connection_string = (
    "oracle+cx_oracle://{username}:{password}@"
    + cx_Oracle.makedsn("{hostname}", "{port}", service_name="{service_name}")
)

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = oracle_connection_string.format(
    username="username",
    password="pass",
    hostname="localhost",
    port="1521",
    service_name="XEPDB1",
)

db = SQLAlchemy(app)


class Contact(db.Model):
    __tablename__ = "Contact"

    id = db.Column(
        db.Integer,
        Identity(start=1000000000, cycle=True),
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(db.String(255))
    phone_number = db.Column(db.String(255))


with app.app_context():
    # i guess this creates the table above
    # db.create_all()

    # let's add the bebop crew
    # spike = Contact(name="Spike Spiegel", phone_number="123123123")
    # jet = Contact(name="Jet Black", phone_number="123123123")
    # faye = Contact(name="Faye Valentine", phone_number="123123123")
    # ed = Contact(name="Ed", phone_number="123123123")
    #
    # db.session.add_all([spike, jet, faye, ed])
    # db.session.commit()
    #
    # fetch all rows to check if they are added or not
    bebop_crew = Contact.query.all()

    for b in bebop_crew:
        print(f"ID: {b.id}, name: {b.name}, phone: {b.phone_number}")


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
