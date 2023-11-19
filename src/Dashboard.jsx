import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Input from './Input';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
    const [searchContact, setSearchContact] = useState('');

    const location = useLocation();
    const contacts = location.state || [];

    const buttonStyle = {
        width: 'fit-content',
    };

    const find = () => {
        // TODO Add logic for searching contacts
        console.log(contacts);
    };

    return (
        <>
            <div className="contactPage">
                <div className="leftPanel">
                    <h1>Main Menu</h1>
                    <Input value={searchContact} setter={setSearchContact} />
                    <button
                        type="button"
                        className="loginButton"
                        style={buttonStyle}
                        onClick={find}
                    >
                        Find
                    </button>
                    <Link to="/add" state={contacts}>
                        {' '}
                        {/* Use Link for navigation */}
                        <button
                            type="button"
                            className="loginButton"
                            style={buttonStyle}
                        >
                            Add New Contact
                        </button>
                    </Link>
                </div>
                <div className="rightPanel">
                    {contacts.map((contact) => (
                        <Card
                            key={contact.id}
                            name={contact.name}
                            phoneNumber={contact.phone}
                        />
                    ))}
                </div>
                <Link to="/">Back to login </Link>
            </div>
        </>
    );
};

export default Dashboard;
