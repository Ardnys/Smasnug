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

    const contact = contacts.find((c) => c.id === id || '');

    const handleSave = () => {
        contact.name = name;
        contact.phone = phone;
        navigate('/dashboard', { state: contacts });
    };
    return (
        <>
            <div className="editPage">
                <h1>Edit contact</h1>
                <img
                    src={contact.imgSrc}
                    className="defaultLogo"
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
