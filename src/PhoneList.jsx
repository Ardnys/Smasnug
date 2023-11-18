import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [searchContact, setSearchContact] = useState('');

    const inputStyle = {
        fontSize: '32px',
        padding: '10px',
    };

    const buttonStyle = {
        width: 'fit-content',
    };

    const find = () => {};

    const addContact = () => {};

    return (
        <>
            <div className="contactPage">
                <div className="leftPanel">
                    <h1>Main Menu</h1>
                    <input
                        type="text"
                        value={searchContact}
                        style={inputStyle}
                        onChange={(event) =>
                            setSearchContact(event.target.value)
                        }
                    />
                    <button
                        type="button"
                        className="loginButton"
                        style={buttonStyle}
                        onClick={find}
                    >
                        Find
                    </button>
                    <button
                        type="button"
                        className="loginButton"
                        style={buttonStyle}
                        onClick={addContact}
                    >
                        Add New Contact
                    </button>
                </div>
                <div className="rightPanel"></div>
            </div>
        </>
    );
};

/*
            <div>
                <h1>This is going to be a phone list thing </h1>
                <Link to="/">Back to login </Link>
            </div>
            */

export default Dashboard;
