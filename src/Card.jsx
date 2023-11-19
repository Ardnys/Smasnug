import defaultLogo from './assets/default.jpg';

const Card = ({ name, phoneNumber, id, imgSrc = defaultLogo, yeet }) => {
    return (
        <div key={id} className="card">
            <img className="cardImage" src={imgSrc} />

            <div className="cardData">
                <h2 className="cardName">{name}</h2>
                <h2 className="cardNumber">{phoneNumber}</h2>

                <div className="cardButtons">
                    <button className="cardButton">Edit</button>

                    <button className="cardButton" onClick={() => yeet(id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
