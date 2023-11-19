import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Input from './Input';
import contactLogo from './assets/contact.jpg';

const Edit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const contacts = location.state || [];

    console.log(contacts);

    const handleSave = () => {
        navigate('/dashboard');
    };
    return (
        <>
            <div className="editPage">
                <h1>Edit contact</h1>
                <img
                    src={contactLogo}
                    className="contactLogo"
                    alt="a placeholder silouhette of a man"
                />

                <Input value={name} setter={setName} />
                <Input value={phone} setter={setPhone} />
                <button
                    className="addContactButton"
                    type="button"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default Edit;
