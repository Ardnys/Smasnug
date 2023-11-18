import { useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import contactLogo from './assets/contact.jpg';

const AddContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    let navigate = useNavigate();

    const add = () => {
        let path = '/dashboard';
        navigate(path);
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
