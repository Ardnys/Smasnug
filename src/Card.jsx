const Card = ({ name, phoneNumber }) => {
    return (
        <div className="card">
            <img className="cardImage" />

            <button>Edit</button>

            <button>Delete</button>
        </div>
    );
};

export default Card;
