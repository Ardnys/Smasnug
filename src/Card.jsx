const Card = ({ name, phoneNumber, id }) => {
    return (
        <div key={id} className="card">
            <img className="cardImage" />

            <div className="cardData">
                <h2 className="cardName">{name}</h2>
                <h2 className="cardNumber">{phoneNumber}</h2>

                <div className="cardButtons">
                    <button className="cardButton">Edit</button>

                    <button className="cardButton">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
