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
    async function postData(contact) {
        try {
            const response = await fetch('http://localhost:5000/bebop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });
        } catch (error) {
            console.error('ERROR: could not post item to database: ', error);
        }
    }

    const add = () => {
        // TODO: maybe check that name and phone is valid
        const contact = {
            name: name,
            phone: phone,
            id: 0, // not needed
            imgSrc: defaultLogo,
        };
        postData(contact);
        // if i add the new contact to database,
        // i don't have to pass the new contacts like that

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
                <label>Name</label>
                <Input value={name} setter={setName} />
                <label>Phone</label>
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
