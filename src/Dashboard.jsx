import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

const Dashboard = () => {
    const [searchContact, setSearchContact] = useState('');

    const buttonStyle = {
        width: 'fit-content',
    };

    const find = () => {
        // Add logic for searching contacts
    };

    // Removed the direct use of `useNavigate`

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
                    <Link to="/add">
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
                <div className="rightPanel"></div>
                <Link to="/">Back to login </Link>
            </div>
        </>
    );
};

export default Dashboard;
