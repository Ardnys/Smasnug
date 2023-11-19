import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Input from './Input';
import { useLocation, useNavigate } from 'react-router-dom';
import contactLogo from './assets/contact.jpg';
import defaultLogo from './assets/default.jpg';

const AddContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const location = useLocation();
    const contacts = location.state || [];

    let navigate = useNavigate();

    const add = () => {
        // TODO: maybe check that name and phone is valid
        const contact = {
            name: name,
            phone: phone,
            id: uuidv4(),
            imgSrc: defaultLogo,
        };
        const updatedContacts = [...contacts, contact];

        let path = '/dashboard';
        navigate(path, { state: updatedContacts });
    };
    return (
        <>
            <div className="addContactPage">
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
                    onClick={add}
                >
                    Add
                </button>
            </div>
        </>
    );
};

export default AddContact;
